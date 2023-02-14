const express = require("express");
const app = express();
const cors = require("cors");
const uploader = require("./helpers/uploader");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json({
		message: "This is upload service",
	});
});

app.post("/", upload.single("image"), async (req, res) => {
	const { file } = req;
	try {
		const { url } = await uploader(file.buffer);

		res.status(200).json({
			url,
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = app;
