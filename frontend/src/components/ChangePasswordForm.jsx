import { useState } from "react";
import Button from "../components/Button";
import "./ChangePasswordForm.css";
import Input from "../components/Input";

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/";
        return null;
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/user/changePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (res.ok) {
                alert("Password changed successfully. Please login again.");
                localStorage.removeItem("token");
                window.location.href = "/";
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                const data = await res.json();
                alert(data.msg || "Failed to change password.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password.");
        }
    };

    return (
        <>
            <h2 style={{ color: "black" }}>Change Password</h2>
            <Input
                label="Old Password"
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
                label="New Password"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button text="Change Password" onClick={handleChangePassword} />
        </>
    );
};

export default ChangePasswordForm;
