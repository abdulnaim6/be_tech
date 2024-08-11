import express from "express";
const app = express();
import bodyParser from "body-parser";
import router from "./src/router/user.router.js";
import detailRouter from "./src/router/detail.router.js";
import cors from "cors";

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(router);
app.use(detailRouter);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
