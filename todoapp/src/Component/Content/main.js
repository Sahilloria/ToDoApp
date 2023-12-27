import React from "react";
import Form from "./Form";
import NewList from "./NewList";
import axios from "axios";

const Main = () => {
    const [todo, setTodo] = React.useState(null);
    const [switchButton, setSwitchButton] = React.useState(false);
    const [form, setform] = React.useState({
        title: "",
        message: ""
    });
    const [id,setId]=React.useState();
    const getTodoList = () => {
        axios.get("http://localhost:8000/todolist")
            .then(res => setTodo(res))
    };

    const handleEdit = (value) => {
        setId(value.id)
        setform({
            title: value.title,
            message: value.message
        })
        setSwitchButton(!switchButton)
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/todolist/edit/${id}`, form)
            .then(res => {
                getTodoList();
                alert("Update Successfully!")
                setSwitchButton(!switchButton)
                setform({
                    title: "",
                    message: ""
                })
            })
    };
    React.useEffect(() => {
        getTodoList()
    }, []);

    return (
        <section className="box-section">
            <Form
                form={form}
                setform={setform}
                getTodoList={getTodoList}
                switchButton={switchButton}
                handleUpdate={handleUpdate}
            />
            <NewList
                todo={todo}
                getTodoList={getTodoList}
                handleEdit={handleEdit}

                setSwitchButton={setSwitchButton}
            />
        </section>
    )
};

export default Main;