const port = process.env.PORT || 4004;
const app = require("../app.js");

app.listen(port, (req, res) => {
	console.log(`Uploader listening on port: ${port}`);
});
