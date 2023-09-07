const express = require("express");
const path = require("path");
const config = require("./config/index");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const router = require("./routes/index");
const interceptor = require("./plugins/interceptor");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(express.static(path.join(__dirname, "upload")));
app.use(interceptor);
router(app);

app.listen(config.port, () => {
	console.log("服务启动，端口：" + config.port);
});
