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

app.get("/login",(req,res)=>{
    res.render("login");
    })

app.post("/signup",async (req,res)=>{

    const data={
        name: req.body.username,
        password: req.body.password
        

    }

    //check if username exist
    const existusername= await  collection.findOne({name: data.name});

    if(existusername){
        res.status(409).json({ message: "User already exists" });
    }

    else{

        const saltrounds=10;
        const hashPassword= await bcrypt.hash(data.password,saltrounds);

        data.password=hashPassword;
        const userdata= await collection.insertMany(data);
        console.log(userdata);

        res.status(200).json({ message: "Go to login page" });
    

    }




})


app.post("/login",async (req,res)=>{

    try{

        const check= await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user not found");
        }

        const ispasswordcorrect=await bcrypt.compare(req.body.password,check.password);
        if(ispasswordcorrect){
            res.render("home");
        }
        else{
            res.send("Wrong password");

        }



    }
    catch{

        res.send("wrong details");



    }

})

app.get("/signup",(req,res)=>{
    res.render("signup");
    })
    
    

const port=5000;
app.listen(port,()=>{
    console.log('server running on port: $(port)');

})