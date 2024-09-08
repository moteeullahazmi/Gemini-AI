const {GoogleGenerativeAI} =  require("@google/generative-ai") // Google
const express =require("express")
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyParser.json())


require('dotenv').config() //dotenv

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const response = async(prompt)=>{ 
    try{
        const result = await model.generateContent(prompt);
       return result.response.text()
    }catch(err){
        console.log(err)
    }
}


app.get("/", (req,res)=>{
   res.send("Hello Gemini")
})


app.post("/api/request", async (req,res)=>{
    try{
        const data = req.body.question
        const result =await response(data)
        res.send({"result " :result})
    }catch(err){
        res.send("error:" +err)
    }
})





app.listen(3000,()=>{
    console.log("Server start 3000")
})