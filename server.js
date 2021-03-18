const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static("public"));

let routes = require("./api/routes");
routes(app);

app.listen(port, function () {
	console.log("Server started on port: " + port);
});
