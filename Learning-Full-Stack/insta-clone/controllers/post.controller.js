const multer = require("multer");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const upload = multer({ storage: multer.memoryStorage() });
const imageKit = new ImageKit({
  privatekey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPost = async (req, res) => {
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
  });

  res.send({
    name: file.name,
    url: file.url,
    size: Number((file.size / (1024 * 1024)).toFixed(2)) + "MB",
    Id: file.fileId,
  });
};

module.exports = { createPost };
