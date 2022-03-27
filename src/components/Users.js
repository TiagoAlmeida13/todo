import React, { useState, useEffect } from "react";

export default function User() {

    const [user, setUser] = useState([]);
    const [todo, setTodo] = useState([]);
    const [value, setValue] = useState("");


    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        fetch(
            `https://jsonplaceholder.typicode.com/users/`
        )
            .then((res) => res.json())
            .then((json) => {
                setUser(json);
            })
    }

    const getTodoByUser = id => {
        fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${id}`)
            .then((res) => res.json())
            .then((json) => {
                setTodo(json);
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
                {todo.length > 0 ?
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                        <button type="submit">Add</button>
                    </form>
                    : null}

            </div>

            <div className="todo-list">
                {todo.map((todo, index) => {
                    return (
                        <div className="todo-title"
                            onClick={() => markComplete(index)}>
                            <p className={todo.completed ? "todo-complete" : "todo-not-completed"}>
                                {todo.title}
                            </p>
                        </div>
                    )
                })}



            </div>

        </div>
    )


}





