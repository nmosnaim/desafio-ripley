const fs = require("fs");

const databaseFunctions = {
	read: function (callback) {
		fs.readFile("data/database.json", (error, fileData) => {
			if (error) {
				console.log("Error reading database", error);
				return callback && callback(error);
			}
			try {
				const object = JSON.parse(fileData);
				return callback && callback(null, object);
			} catch (exception) {
				console.log("Error parsing database data", exception);
				return callback && callback(exception);
			}
		});
	},
	update: function (dataString, callback) {
		fs.writeFile("data/database.json", dataString, (error) => {
			if (error) {
				console.log("Error writing to database", error);
				return callback && callback(error);
			} else {
				console.log("Successfully updated database");
				return callback && callback(null);
			}
		});
	},
};

module.exports = databaseFunctions;
