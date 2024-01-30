import express, { Request, Response }  from "express";
import { addTodo, checkTodo, deleteTodo, getAll } from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.post("/",addTodo);

todoRouter.get("/",getAll);

todoRouter.delete("/:id",deleteTodo),

todoRouter.put("/:id",checkTodo)

export default todoRouter;


