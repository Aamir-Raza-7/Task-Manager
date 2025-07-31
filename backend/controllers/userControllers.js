const User = require('../models/users')
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "internal server error" });
    }
}

const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
        return res.status(400).json({ msg: "Role is required" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: "Only admins can change user roles" });
        }

        user.role = role;
        await user.save();
        res.status(200).json({ msg: "User role updated successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting account" });
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ msg: "Old password and new password are required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isMatch = await user.checkPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ msg: "Old password does not match" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ msg: "New password must be at least 6 characters long" });
        }
        
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ msg: "Password changed successfully. Please log in again." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { getAllUsers, updateUserRole, deleteUserAccount, changePassword };