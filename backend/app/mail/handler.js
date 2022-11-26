const { validateSendMailSchema } = require("../../validator/mail");
const { User, Mail } = require("../../models");
const fs = require("fs");
const { saveFile, decryptFile } = require("../../utils/cryptoAES");
const { encrypt, decrypt } = require('../../utils/textEncDec');

module.exports = {
  handlerGetSentMail: async (req, res, next) => {
    try {
      const user = req.user;

      const inbox = await Mail.findAll({
        where: {
          id_from: user.id,
        },
        attributes: ["id", `subject`, "bodyMail"],
        include: [{ model: User, as: "to", attributes: ["id", "email"] }],
      });
      res.status(200).json({
        status: "success",
        message: "Successfull get sent mail",
        data: inbox.map((x) => ({
          id: x.id,
          subject: decrypt(x.subject),
          bodyMail: decrypt(x.bodyMail),
          to: x.to,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetInboxMail: async (req, res, next) => {
    try {
      const user = req.user;
      const inbox = await Mail.findAll({
        where: {
          id_to: user.id,
        },
        attributes: ["id", "subject", "bodyMail"],
        include: [{ model: User, as: "from", attributes: ["id", "email"] }],
      });

      res.status(200).json({
        status: "success",
        message: "Successfull get inbox mail",
        data: inbox.map((x) => ({
          id: x.id,
          subject: decrypt(x.subject),
          bodyMail: decrypt(x.bodyMail),
          from: x.from,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostMail: async (req, res, next) => {
    try {
      const { email, subject, bodyMail } = req.body;
      validateSendMailSchema({ email, subject, bodyMail });
      const searchEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      const encryptMail = encrypt(bodyMail);
      const encryptSubject = encrypt(subject);
      if (!searchEmail) {
        throw new Error("Email not found");
      }

      var ext = null;
      const img = req.file;
      if (!img) {
        throw new Error("Image not found");
      }
      const encFile = await saveFile(img);

      const sendMail = await Mail.create({
        subject: encryptSubject,
        bodyMail: encryptMail,
        id_to: searchEmail.id,
        id_from: req.user.id,
        image: encFile,
        ext: ext,
      });

      res.status(200).json({
        status: "success",
        message: "Successfully send mail",
        data: sendMail,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetInboxById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const inboxbyid = await Mail.findOne({
        where: {
          id_to: user.id,
          id: id,
        },
        include: [{ model: User, as: "from", attributes: ["id", "email"] }],
      });
      if (inboxbyid) {
        if (inboxbyid.image) {
          const encryptedHex = fs.readFileSync(
            `./public/uploads/${inboxbyid.image.replace("/", "")}`,
            "utf8"
          );
          const base64 = await decryptFile(encryptedHex);
          inboxbyid.subject = decrypt(inboxbyid.subject);
          inboxbyid.bodyMail = decrypt(inboxbyid.bodyMail);
          inboxbyid.image = `data:image/jpeg;base64,${base64}`;
        }
      }
      res.status(200).json({
        status: "success",
        message: "Successfull get inbox mail",
        data: inboxbyid,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetSentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const sentbyid = await Mail.findOne({
        where: {
          id_from: user.id,
          id: id,
        },
        include: [{ model: User, as: "to", attributes: ["id", "email"] }],
      });

      if (sentbyid) {
        if (sentbyid.image) {
          const encryptedHex = fs.readFileSync(
            `./public/uploads/${sentbyid.image.replace("/", "")}`,
            "utf8"
          );
          const base64 = await decryptFile(encryptedHex);
          sentbyid.subject = decrypt(sentbyid.subject);
          sentbyid.bodyMail = decrypt(sentbyid.bodyMail);
          sentbyid.image = `data:image/jpeg;base64,${base64}`;
        }
      }
      res.status(200).json({
        status: "success",
        message: "Successfull get inbox mail",
        data: sentbyid,
      });
    } catch (error) {
      next(error);
    }
  },
};
