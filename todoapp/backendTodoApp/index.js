const express = require("express");
const mySQL = require("mySQL");
const cors = require("cors");
const Port = 8000;
const app = express();
app.use(express.json())
app.use(cors())


// here you need to enter your credentials to connect with
const db = mySQL.createConnection({
    host: "localhost",  
    password: "Sanadogra@1",
    database: "todoapp",
    user: "root"
});

app.get("/todolist", (req, res) => {
    const query = "select * from TodoList";
    db.query(query, (err, data) => {
        if (err) {
            return "Error"
        } else {
            return res.json(data)
        }
    })
});

app.put("/todolist/edit/:id",(req,res)=>{
    const {title,message}=req.body;
    const {id}=req.params;
    const query="Update TodoList set title=(?), message=(?) where id=(?)";
    db.query(query,[title,message,id],(err,data)=>{
        if(err){
            return "Error"
        }else{
            return res.json(data)
        }
    })
});

app.post("/todolist", ((req, res) => {
    const query = "insert into TodoList(title,message) values(?) ";
    const values=[req.body.title, req.body.message];
    db.query(query,[values],(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
            return res.json(data)
        }
    })

}));

app.delete("/todolist/:id", (req, res) => {
    const { id } = req.params;
    const query = "delete from TodoList where id=?";

    db.query(query, [id], (err, data) => {
        if (err) {
            return "Error"
        } else {
            return res.json(data)
        }
    })
})
app.listen(Port, () => console.log("I am working"))