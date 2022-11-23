import express from "express";
import { Application } from "express";
import appLogger from "./middleware/appLogger";
import todoRouter from "./routes/todoRoute";
import authRouter from "./routes/authRoute";
import shareRouter from "./routes/shareRoute";
var cors = require("cors");

const app: Application = express();

const port: number = 4000;
app.set("port", 4000);

/*
 * Configuring express to recieve data in JSON format
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
 * MiddleWare Configuration
 */
app.use(appLogger);

/*
 * Router Configuration
 */
app.use("/todo", todoRouter);
app.use("/sharedrecords", shareRouter);
app.use("/auth", authRouter);

export default app;
