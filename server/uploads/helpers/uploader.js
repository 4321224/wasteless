const cloudinary = require("../config/cloudinary");
const { Readable } = require('stream');

const streamUpload = (buffer) => {
	return new Promise((resolve, reject) => {
		let stream = cloudinary.uploader.upload_stream((error, result) => {
			if (result) {
				resolve(result);
			} else {
				reject(error);
			}
		});

		const imgStream = Readable.from(buffer);
		imgStream.pipe(stream);
	});
};

async function uploader(buffer) {
	let result = await streamUpload(buffer);

	return result;
}

module.exports = uploader;
