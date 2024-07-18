const express=require("express");
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config")


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(express.static("public"));


app.get("/",(req,res)=>{
res.render("login");
})

app.post("/signup",async (req,res)=>{

    const data={
        name: req.body.username,
        password: req.body.password
        

    }

    const userdata= await collection.insertMany(data);
    console.log(userdata);


})

    

app.get("/signup",(req,res)=>{
    res.render("signup");
    })
    
    

const port=5000;
app.listen(port,()=>{
    console.log('server running on port: $(port)');

})