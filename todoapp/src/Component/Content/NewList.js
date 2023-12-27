import React from "react";
import "./main.css";
import axios from "axios";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const NewList = ({ todo, getTodoList,handleEdit }) => {

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/todolist/${id}`)
            .then(res => getTodoList())
    };

    

    const sortDataBydate = todo?.data?.sort((a, b) => b.id - a.id);

    if (sortDataBydate === undefined) {
        return (
            <div style={{ textAlign: "center", color: "white" }}>
                Loading...
            </div>
        )
    };

    return (
        <section >
            <div className="list-heading">My List</div>
            <div className="todo-list">
                {sortDataBydate?.map((values) => {
                    return (
                        <div className="new-item">
                            <div key={values.id}>
                                <h3>{values.title}</h3>
                                <p>{values.message}</p>
                                <p>{moment(values.time).format("Do MMM, HH:mm")}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                                <FaRegEdit
                                    onClick={()=>handleEdit(values)}
                                    color="white"
                                    size={20}
                                    cursor="pointer"
                                />
                                <MdDelete
                                    onClick={() => handleDelete(values.id)}
                                    color="white"
                                    size={20}
                                    cursor="pointer"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
};

export default NewList;