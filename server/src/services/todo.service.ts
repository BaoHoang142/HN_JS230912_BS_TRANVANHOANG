import pool from "../utils/database";
import mysql from "mysql2/promise";

export const getAllMysql= async ()=> {
    const result = mysql.createPool(pool);
    return result.execute("SELECT * FROM todo");
};

export const deleteTodoMysql= async (id:number)=> {
    const todo = mysql.createPool(pool);
    const [result] = await todo.execute("DELETE FROM todo WHERE id=?;",[id]);
    return result
}

export const addTodoMysql= async (name:string)=> {
    const todo = mysql.createPool(pool);
    const [result] = await todo.execute("INSERT INTO todo (name,status) VALUES (?,?);",[name,0]);
    return result
}

export const checkTodoMysqlFlase= async (id:number)=> {
    const todo = mysql.createPool(pool);
    const [result] = await todo.execute("UPDATE todo SET status = 1 WHERE id=?;",[id]);
    return result
}
export const checkTodoMysqlTrue= async (id:number)=> {
    const todo = mysql.createPool(pool);
    const [result] = await todo.execute("UPDATE todo SET status = 0 WHERE id=?;",[id]);
    return result
}