const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {genSaltSync} = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'employee'],
        default: "employee"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hashSync(this.password, genSaltSync(10))
    next()
})

userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const user = mongoose.model("user", userSchema)
module.exports = user