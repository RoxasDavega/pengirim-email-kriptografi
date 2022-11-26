module.exports = {
  rot13: function (str) {
    const amount = 13;
    if (amount < 0) {
      return rot13(str, amount + 26);
    }
    var output = "";
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      if (c.match(/[a-z]/i)) { // if text
        var code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) { // uppercase
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        }
        else if (code >= 97 && code <= 122) { // lowercase
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
      output += c;
    }
    return output;
  },
};
