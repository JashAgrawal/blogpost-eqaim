require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/config");
const blogRoute = require("./routes/routes");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
connectDB();
console.log(path.join(__dirname, "uploads"));
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.join(__dirname, "uploads")));
app.use("/api", blogRoute);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
