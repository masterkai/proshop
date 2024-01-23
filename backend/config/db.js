import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected to MongoDB ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connecting to MongoDB:", error);
		process.exit(1); // Exit the process with an error code of 1 (indicating failure)
	}
};
export default connectDB;

export { connectDB };
