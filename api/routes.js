"use strict";

const controller = require("./controller");

module.exports = function (app) {
	app.route("/about").get(controller.about);
	app.route("/balanceQuery/:rut").get(controller.balanceQuery);
	app.route("/executeTransfer").post(controller.executeTransfer);
	app.route("/getIndicator/:indicator").get(controller.getIndicator);
};
