const jwt = require('jsonwebtoken')
const User = require('../models/users')

const genToken = (user) => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET)
}

const login = async(req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({msg: "bad request: mossing params"})
    }
    try {
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({ message: "User not found" })
        }

        if (!await userExists.checkPassword(password)) {
            return res.status(400).json({ message: "invalid password" })
        }

        res.status(200).json({
            token: genToken(userExists),
            user: {id: userExists.id, email: userExists.email}
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Internal Server Error"})
    }
}


const signup = async(req, res) => {
    const{name, email, password} = req.body
    
    if(!name || !email || !password){
        return res.status(400).json({msg: "bad request: missing params"})
    }

    try {
        const userExists = await User.findOne({email})
        
        if(userExists){
            return res.status(400).json({msg: "user already exists"})
        }
        
        const createUser = await User.create({name, email, password})
        res.status(200).json({
            token: genToken(createUser),
            user: {id: createUser.id, email: createUser.email, role: createUser.role}
        })
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {login, signup}