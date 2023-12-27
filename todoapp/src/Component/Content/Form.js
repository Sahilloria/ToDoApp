import React from "react";
import "./main.css";
import axios from "axios";

const Form = ({ setform, form, getTodoList, switchButton,handleUpdate }) => {

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setform((preState) => {
            return {
                ...preState,
                [name]: value
            }
        })

    };

    const handleSubmit = (e) => {
            e.preventDefault()
            axios.post("http://localhost:8000/todolist", form)
                .then(res => {
                    getTodoList()
                    setform({
                        title: "",
                        message: ""
                    })
                })
    };
  
    return (
        <>
            <h1> My Day</h1>
            <form className="input-section" >
                <div className="input-item">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        className="input"
                        placeholder="What's the title of your To Do?"
                        onChange={handleOnchange}
                        value={form.title}
                        name="title"
                        required
                    />
                </div>
                <div className="input-item">
                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        className="input"
                        placeholder="What's the description of your To Do?"
                        onChange={handleOnchange}
                        value={form.message}
                        name="message"
                        required

                    />
                </div>
                {switchButton ?
                    <button className="add-btn" onClick={handleUpdate} >Update</button> :
                    <button className="add-btn" onClick={handleSubmit} >Add</button>
                }
                </form>

               

            
        </>
    )
};

export default Form;