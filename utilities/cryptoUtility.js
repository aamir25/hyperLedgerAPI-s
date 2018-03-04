const crypto2 = require('crypto2');

var getKeys = async function () {
	const { privateKey, publicKey } = await crypto2.createKeyPair();
  	return { privateKey, publicKey };
}

var encrypt = async function (document, publicKey) {
	const encryptedMsg = await crypto2.encrypt.rsa(document, publicKey);
	return encryptedMsg;
}

var cryptoUtility = {
	getKeys: getKeys,
	encrypt: encrypt
};

module.exports = cryptoUtility;