const baseUrl = "http://localhost:3000/";

function showResponse(response) {
	if (response.success) {
		alert(response.message);
	} else {
		alert("Error: " + response.message);
	}
}

function fetchSaldo() {
	const inputRut = document.getElementById("input-rut").value;
	fetch(baseUrl + "balanceQuery/" + inputRut)
		.then(function (response) {
			return response.json();
		})
		.then(function (responseData) {
			showResponse(responseData);
		})
		.catch(function (error) {
			console.warn("Error!", error);
		});
}

function doTransfer() {
	const inputOriginAccount = document.getElementById("input-cuenta-1").value;
	const inputDestinationAccount = document.getElementById("input-cuenta-2")
		.value;
	const inputAmount = document.getElementById("input-monto").value;

	const requestBody = {
		originAccountNumber: parseInt(inputOriginAccount),
		destinationAccountNumber: parseInt(inputDestinationAccount),
		amount: parseInt(inputAmount),
	};

	fetch(baseUrl + "executeTransfer/", {
		method: "POST",
		body: JSON.stringify(requestBody),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (responseData) {
			showResponse(responseData);
		})
		.catch(function (error) {
			console.warn("Error!", error);
		});
}

function fetchIndicador() {
	const inputIndicator = document.getElementById("input-indicador").value;
	fetch(baseUrl + "getIndicator/" + inputIndicator)
		.then(function (response) {
			return response.json();
		})
		.then(function (responseData) {
			showResponse(responseData);
		})
		.catch(function (error) {
			console.warn("Error!", error);
		});
}
