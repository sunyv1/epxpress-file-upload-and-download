const config = require("../config");

function interceptor(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Content-Type", "application/json;charset=utf-8");
	if (req.headers.authorization == config.authorization) {
		next();
		return;
	}
	res.send({ code: -1, msg: "authorization error!" });
}

module.exports = interceptor;
