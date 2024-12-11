import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
const port = process.env.PORT;

dotenv.config({
  path: "./.env",
});

app.get("/", (req, res) => {
  res.send("Welcome to language learning app backend");
});

connectDB()
  .then(() => {
    app.listen(port || 8000, () => {
      console.log(`Leanguage learning app is running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongoDb connection failed", err);
  });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
