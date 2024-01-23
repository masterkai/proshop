import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import colors from "colors";

dotenv.config();
connectDB();
const importDATA = async () => {
  try {
    await Order.deleteMany({}, { bufferTimeoutMS: 30000 });
    await Product.deleteMany({}, { bufferTimeoutMS: 30000 });
    await User.deleteMany({}, { bufferTimeoutMS: 30000 });

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);

    console.log(colors.green("Data imported"));
    process.exit();
  } catch (e) {
    console.log(colors.red(`${e}`));
    process.exit(1); // Exit the process with an error code of 1 (indicating failure)
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(colors.red("Data destroyed"));
    process.exit();
  } catch (e) {
    console.log(colors.red(`${e}`));
    process.exit(1); // Exit the process with an error code of 1 (indicating failure)
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importDATA();
}
