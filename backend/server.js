const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const bookRoute = require("./routes/book");
const port = process.env.PORT || 4000;

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/images", express.static("./uploads"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});