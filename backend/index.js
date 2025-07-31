const express = require('express')
const dbConnection = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const taskRouter = require('./routes/taskRouter')
const userRouter = require('./routes/userRouter')

dotenv.config()
dbConnection()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.urlencoded({require: true}))
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/task", taskRouter)
app.use("/api/user", userRouter)

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})