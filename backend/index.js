const express = require('express')
const dbConnection = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')
const authRouter = require('./routes/authRouter')

dotenv.config()
dbConnection()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.urlencoded({require: true}))
app.use(express.json())

app.use("/api/auth", authRouter)

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})