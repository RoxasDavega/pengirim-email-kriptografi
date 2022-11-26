const jwt = require("jsonwebtoken");
const accessToken = "abcdefghijklmn123123";

function generateAccessToken(payload) {
    return jwt.sign(payload, accessToken, {
        subject: payload.email,
        expiresIn: "45m",
    });
}

module.exports = generateAccessToken;