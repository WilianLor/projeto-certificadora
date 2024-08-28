import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.config";

dotenv.config();

const app: Express = express();

connectDatabase();

app.set("port", process.env.PORT || 3030);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req: Request, res: Response) => {
  res.send("teste");
});

app.listen(app.get("port"), () => {
  console.log(`[server]: Server is running at port ${app.get("port")}`);
});
