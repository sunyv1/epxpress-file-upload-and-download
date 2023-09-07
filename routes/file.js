var express = require("express");
var router = express.Router();
const _path = require("path");
const timestamp = require("time-stamp");
const fs = require("fs");

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

module.exports = router;
