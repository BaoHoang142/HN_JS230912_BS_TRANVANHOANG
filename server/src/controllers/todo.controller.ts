import { Request, Response } from "express";
import {
  addTodoMysql,
  checkTodoMysqlFlase,
  checkTodoMysqlTrue,
  deleteTodoMysql,
  getAllMysql,
} from "../services/todo.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await getAllMysql();
    console.log(result);
    res.status(200).json({
      message: "thanh cong lay tat ca",
      data: result[0],
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoId = deleteTodoMysql(Number(req.params.id));
  res.status(200).json({
    message: "xoa thanh cong",
  });
};

export const addTodo = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name } = req.body;
  const result = await addTodoMysql(name);
  if (!result) {
    res.status(500).json({
      message: "Có lỗi khi thêm",
    });
  } else {
    res.status(201).json({
      message: "Thêm thành công",
      result,
    });
  }
};

export const checkTodo = async (req: Request, res: Response) => {
  console.log(req.body);
  const { id } = req.params;
  const { status } = req.body;
  if (status == 0) {
    const todo = await checkTodoMysqlFlase(+id);
    res.status(200).json({
      message: "Cập nhật thanh cong",
      todo,
    });
  } else {
    const todo = await checkTodoMysqlTrue(+id);
    res.status(200).json({
      message: "Cập nhật thanh cong",
      todo,
    });
  }
};
