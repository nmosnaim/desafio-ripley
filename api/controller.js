"use strict";

const properties = require("../package.json");
const https = require("https");
const database = require("../utils/database");
const date = require("../utils/date");

const controllers = {
	about: function (req, res) {
		const aboutInfo = {
			name: properties.name,
			version: properties.version,
		};
		res.json(aboutInfo);
	},
	balanceQuery: function (req, res) {
		let response = {
			success: false,
			message: null,
		};
		database.read((error, data) => {
			if (error) {
				response.message = error;
			} else {
				const userAccount = data.find(
					(account) => account.rut == req.params.rut
				);
				if (userAccount) {
					response.success = true;
					response.message = "El saldo es de $" + userAccount.saldo;
				} else {
					response.message = "No existe cuenta asociada a ese Rut";
				}
			}
			res.json(response);
		});
	},
	executeTransfer: function (req, res) {
		let response = {
			success: false,
			message: null,
		};

		if (isNaN(req.body.amount) || req.body.amount <= 0) {
			response.message = "Monto inválido";
			res.json(response);
		} else if (
			req.body.originAccountNumber == req.body.destinationAccountNumber
		) {
			response.message =
				"Cuenta de destino debe ser distinta a cuenta de origen";
			res.json(response);
		} else {
			database.read((error, data) => {
				if (error) {
					response.message = error;
				} else {
					const originAccountIndex = data.findIndex(
						(account) => account.numeroCuenta == req.body.originAccountNumber
					);
					const destinationAccountIndex = data.findIndex(
						(account) =>
							account.numeroCuenta == req.body.destinationAccountNumber
					);

					if (originAccountIndex == -1) {
						response.message = "No existe la cuenta de origen";
						res.json(response);
					} else if (destinationAccountIndex == -1) {
						response.message = "No existe la cuenta de destino";
						res.json(response);
					} else {
						if (data[originAccountIndex].saldo < req.body.amount) {
							response.message = "Saldo insuficiente";
							res.json(response);
						} else {
							data[originAccountIndex].saldo -= req.body.amount;
							data[destinationAccountIndex].saldo += req.body.amount;
							database.update(JSON.stringify(data, null, 4), (error, data) => {
								if (error) {
									response.message = error;
								} else {
									response.success = true;
									response.message = "Transferencia realizada con éxito";
								}
								res.json(response);
							});
						}
					}
				}
			});
		}
	},
	getIndicator: function (req, res) {
		let response = {
			success: false,
			message: null,
		};
		let typeParam = "";
		switch (req.params.indicator) {
			case "UF":
			case "uf":
				typeParam = "uf";
				break;
			case "Dolar":
			case "Dólar":
			case "dolar":
			case "dólar":
			case "USD":
			case "usd":
				typeParam = "dolar";
				break;
			case "UTM":
			case "utm":
				typeParam = "utm";
				break;
			default:
				response.message =
					"Indicador inválido, los indicadores aceptados son 'dolar', 'utm' y 'uf'";
				res.json(response);
				return;
		}
		const dateParam = date.getSimpleToday();
		https
			.get(
				"https://mindicador.cl/api/" + typeParam + "/" + dateParam,
				function (apiResponse) {
					apiResponse.setEncoding("utf-8");
					let data = "";

					apiResponse.on("data", function (chunk) {
						data += chunk;
					});
					apiResponse.on("end", function () {
						const responseData = JSON.parse(data);
						response.success = true;
						response.message =
							"El valor del indicador para el día de hoy es de $" +
							responseData.serie[0].valor;
						res.json(response);
					});
				}
			)
			.on("error", function (error) {
				response.message = error;
				res.json(response);
			});
	},
};
module.exports = controllers;
