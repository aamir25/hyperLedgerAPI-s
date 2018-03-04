const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Hash = require('./models/hashModel');

const cryptoUtility = require('./utilities/cryptoUtility');

const db = mongoose.connection;
const app = express();

mongoose.connect('mongodb://localhost:27017/Hashes', {
	useMongoClient : true
});
mongoose.Promise = global.Promise;

db.on('error', function(error) {
	console.log("Connection Error : " + error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//READ ALL HASHES
app.get("/docs", (request, response) => {
	Hash.find(function(error, hashes) {
 		if(error){
 			response.send({
 				success : false,
 				error : error
 			});
 			return console.error(error);
 		}
 		console.log(hashes);
		response.send(hashes);
 	});
});

//SAVE HASH
app.post("/doc", (request, response) => {
	cryptoUtility.getKeys()
	.then((keys) => {
		cryptoUtility.encrypt(request.body.doc, keys.publicKey)
		.then((encryptedMsg) => {
			let hash = new Hash({
				hash: encryptedMsg,
				fileName: request.body.fileName,
				label: request.body.label
			});

			hash
			.save()
			.then(() => {
				response.send(keys);
			})
			.catch((error) => {
				response.status(500).send(error);
			});
		})
		.catch((error) => {
			response.status(500).send(error);
		});
	})
	.catch((error) => {
		response.status(500).send(error);
	});
});

app.listen(8080, () => {
	console.log("Listening on port 8080");
});
