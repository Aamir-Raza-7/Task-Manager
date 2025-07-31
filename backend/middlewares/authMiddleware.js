const jwt = require('jsonwebtoken')
const User = require('../models/users')

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token not found: failed authentication" })
    }
    const token = authHeader.split(" ")[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findById(decoded.id)
        
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}
const authorization = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: "authorization failed: not have permission to access" })
    } else {
        next()
    }
}

module.exports = {protect, authorization}