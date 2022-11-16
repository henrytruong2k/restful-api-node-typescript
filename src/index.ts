import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

//database
const URI = process.env.MONGO_URL as string;
mongoose.connect(
  URI,
  {
    autoIndex: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongodb connection");
  }
);

//routes
app.use("/api", routes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
