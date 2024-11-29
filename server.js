import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT | 7000;

// here goes connection to database
mongoose.set("strictQuery", true);
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("bd connect");
  } catch (error) {
    console.log(error.message);
  }
};
connectDb();

app.listen(port, () => {
  console.log(`server is up and listening at port ${port}`);
});
