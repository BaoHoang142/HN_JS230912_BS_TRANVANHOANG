import express, { Request, Response } from "express";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.routes";
import bodyparser from "body-parser"
import cors from "cors"
dotenv.config();
const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
const PORT: number = 8080;


app.use("/api/v1/todo",todoRouter)
// lay 1 user


app.listen(PORT, () => {
    console.log("server dang chay tai cong " + PORT);
})
