import React, { useEffect } from "react";
import "./FormTodo.css";
import axios from "axios";
interface Todo {
  name: string;
}
interface Todos {
  id: number;
  name: string;
  status: boolean;
}

function FormTodo() {
  const [todo, setTodo] = React.useState<Todo>({ name: "" });
  const [listTodos, setListTodos] = React.useState<Todos[]>([]);
  const [flag, setflag] = React.useState<boolean>(false);
  async function getData() {
    try {
      const db = await axios.get("http://localhost:8080/api/v1/todo/");
      console.log(db);
      setListTodos(db.data.data);
    } catch (error) {
      console.log(error);
    }
  }
 
  const addNew = async () => {
    if (todo.name === "") {
      alert("Vui lòng nhập việc làm");
      return;
    }
    try {
      const db = await axios.post("http://localhost:8080/api/v1/todo/", todo);
      alert(db.data.message);
      setTodo({ name: "" });
    } catch (error) {
      alert("Thất bại");
    }
    setflag(!flag);
    setTodo({ name: "" });
  };
  const deleteJob = (id: number) => {
    const check = confirm("Bạn có muốn xóa không?");
    if (!check) {
      return;
    }
    try {
      axios.delete(`http://localhost:8080/api/v1/todo/${id}`);
      setflag(!flag);
    } catch (error) {}
  };
  const changStatus = async (item: Todos) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/todo/${item.id}`, item);
      setflag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [flag]);
  return (
    <>
      <div id="container">
        <div className="header">
          <h1>Todo List</h1>
          <p> All of todos in 2024</p>
        </div>
        <div className="main">
          {listTodos.map((item) => {
            return (
              <div className="main__bg">
                <div className="main__todo">
                  <div className="main__todo--text">
                    <p
                      style={{
                        textDecoration: item.status ? "line-through" : "",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="main__todo--icon">
                    <input
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      onChange={(e) => changStatus(item)}
                      checked={item.status}
                    />
                    <div>
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "20px",
                          opacity: "1",
                          marginLeft: "25px",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                        onClick={() => deleteJob(item.id)}
                      >
                        delete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <p>Add to the todo list</p>
          <div className="footer__input">
            <div className="footer__input--input">
              <input
                className="input"
                value={todo.name}
                onChange={(e) => setTodo({ name: e.target.value })}
                type="text"
              />
            </div>
            <div className="footer__input--button">
              <button className="btn" onClick={addNew}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormTodo;
