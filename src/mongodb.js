const { default: mongoose } = require("mongoose");
const monoose = require("mongoose");

async function connectMongoDB() {
    try {
        await mongoose.connect ("mongodb+srv://sevabhalodiya2305:Seva%402305@cluster0.jchg3lv.mongodb.net/loginSignupDatabase")
        console.log("mongodb connected")
    } catch (error) {
        console.log("Error in connecting Mongodb" , error) // Error Handling
    }
}
connectMongoDB()
const LoginSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    password : {
        type : String ,
        required : true
    }
})

const collection = new mongoose.model("LoginCollection", LoginSchema)

module.exports = collection