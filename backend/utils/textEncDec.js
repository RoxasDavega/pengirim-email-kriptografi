const { rot13 } = require("./cryptoROT13");
const { encryptAES, decryptAES } = require("./cryptoTextAES");


module.exports = {
  encrypt: function (text) {
    const data = rot13(text)
    const hasil = encryptAES(data);
    return hasil;
  },

  decrypt: function (text) {
    const data = decryptAES(text);
    const hasil = rot13(data);
    return hasil;
  },
};
