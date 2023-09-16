const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname,"../templates")

app.use(express.json())
app.set("view engine" ,"hbs");
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup" , async (req,res) => {
    const {name, password} = req.body

    const existingUser = await collection.findOne({name});

    if(existingUser){
        console.error("Username already exists in the Database");
        res.render("signup",{error : "Username already exists" });
    } else {

        const data = {
            name , password
        }

        await collection.insertMany([data]);

        res.render("home")
    }
});

app.get("/login", (req,res) =>{
    res.render("login")
})

app.post("/login" , async (req,res) => {
    const{name,password} = req.body

    const existingUser = await collection.findOne({name})
    console.log(existingUser)

    if(!existingUser){
        console.log("Username does not exist in the Database" )
        res.render("login" , {error: "Username does not exist"})
    }else if (existingUser.password !== password){
        console.log('password is incorrect')
        res.render("login", {error: "Incorrect Password"})
    }
    else{
        res.render("home")
    }
})

app.listen(3000, () => {
    console.log(`server is running on port 3000`)
})