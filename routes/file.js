var express = require("express");
var router = express.Router();
const _path = require("path");
const timestamp = require("time-stamp");
const fs = require("fs");
const archiver = require ("archiver");

router.post("/upload", function (req, res) {
	const filePath = req.body.path;
	if (!filePath) {
		res.send({ code: -1, msg: "no path" });
		return;
	}
	const file = req.files?.file;
	if (!file) {
		res.send({ code: -1, msg: "no file" });
		return;
	}
	const nameArr = file.name.split(".");
	let newName = timestamp("YYYYMMDDHHmmssms") + "." + nameArr[nameArr.length - 1];
	file.mv(_path.join(`upload/${filePath}/`.replace(/\/\//g, "/")) + newName);
	res.send({ code: 0, msg: "success", data: `/${filePath}/`.replace(/\/\//g, "/") + newName });
});

router.delete("/delete", function (req, res) {
	const { path } = req.body;
	if (!path) {
		res.send({ code: -1, msg: "no path" });
		return;
	}
	try {
		fs.rmSync(_path.join(`upload/${path}`));
		res.send({ code: 0, msg: "success" });
	} catch (err) {
		res.send({ code: -1, msg: err });
	}
});

router.get("/download", function (req, res) {
	const { url } = req.query;
	if (!url) {
		res.send({ code: -1, msg: "no url" });
		return;
	}
	const fileName = url.split("/").pop();
	try {
		res.download(_path.join(`upload/${url}`), fileName);
	} catch (err) {
		res.send({ code: -1, msg: err });
	}
})

router.get("/downloadMany", function (req, res) {
	const { urls } = req.query;
	if (!urls || !urls.length) {
		res.send({ code: -1, msg: "no url" });
		return;
	}
	const zipName = "files.zip";
	const zipPath = _path.join(`upload/zips/${zipName}`);
	try {
		const output = fs.createWriteStream (zipPath);
		const zip = archiver("zip");
		zip.pipe(output);
		for(let url of urls) {
			const fileName = url.split("/").pop();
			zip.append(fs.createReadStream(_path.join(`upload/${url}`)), {name: fileName});
		}
		zip.finalize();
		output.on("close", function() {
			res.download(zipPath, zipName, function(err) {
				if(!err) {
					// 成功后删除压缩文件
					fs.unlinkSync (zipPath);
				}
			});
		});
	} catch (err) {
		res.send({ code: -1, msg: err });
	}
})

module.exports = router;
