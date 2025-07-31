const express = require('express')
const { protect, authorization } = require('../middlewares/authMiddleware')
const { getAllUsers, deleteUserAccount, changePassword, updateUserRole} = require('../controllers/userControllers')

const router = express.Router()

router.get("/myProfile",protect,(req,res)=>{
    res.status(200).json({id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role})
})
router.get("/allUsers", protect, authorization("admin", "manager"), getAllUsers)

router.delete("/deleteUser", protect, deleteUserAccount)

router.put("/changePassword", protect, changePassword)

router.put("/updateRole/:id", protect, authorization("admin"), updateUserRole)

module.exports = router