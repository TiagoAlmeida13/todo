import React, { useState, useEffect } from "react";

export default function User() {

    const [user, setUser] = useState([]);
    const [todo, setTodo] = useState([]);
    const [value, setValue] = useState("");


    useEffect(() => {
        fetch(
            "https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((json) => {
                setUser(json);
            })
    }, []);

    const getTodoByUser = id => {
        fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${id}`)
            .then((res) => res.json())
            .then((json) => {
                setTodo(json)
            })
    };

    const markComplete = index => {
        const newTodo = [...todo];
        newTodo[index].completed = !newTodo[index].completed;
        setTodo(newTodo);
    };

    const addTodo = (value) => {
        const newTodo = [...todo, { id: todo.length + 1, title: value, completed: false }];
        setTodo(newTodo);

    };

    const handleSubmit = e => {
        e.preventDefault();
        value && addTodo(value)
        setValue("");
    };



    return (
        <div className="container">
            <div className="users">
                {
                    user.map((user, index) => {
                        return (
                            <div key={index}>
                                <button onClick={() => getTodoByUser(user.id)}>{user.name}</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="new-todo">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}

                    />
                    <button>Add</button>
                </form>
            </div>
            <div className="todo">

                {
                    todo.map((item, index) => (
                        <div key={item.id}>
                            <div className="todo-item">
                                <div className={"todo-title"}>
                                    <span onClick={() => markComplete(index)}
                                        className={item.completed ? "todo-uncompleted" : "todo-completed"}>
                                        {item.title}
                                    </span>
                                </div>
                                <div className="todo-complete">
                                    <input type="checkbox" checked={item.completed}
                                        onChange={() => markComplete(index)} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

}
