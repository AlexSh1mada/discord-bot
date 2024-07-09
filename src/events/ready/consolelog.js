require("colors");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

module.exports = async () => {
	if (!mongoURL) return;

	mongoose.set("strictQuery", true);
	const dbConnected = await mongoose.connect(mongoURL);

	dbConnected
		? console.log("[SUCCESS]".rainbow + "Connected to the MongoDB database.".rainbow)
		: console.log("[ERROR]".red + "Could not connect to MongoDB.");
};
