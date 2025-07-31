import { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Input from "../components/Input";

const SettingsPage = () => {
    const [deleteConfirm, setDeleteConfim] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changePassword, setChangePassword] = useState(false);


    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/";
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };


    const handleDeleteAccount = async () => {
        if (confirmText !== "DELETE") {
            alert("You must type DELETE to confirm.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/user/deleteUser", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                alert("Account deleted successfully.");
                localStorage.removeItem("token");
                window.location.href = "/";
            } else {
                const data = await res.json();
                alert(data.message || "Failed to delete account.");
            }
        } catch (err) {
            console.log(err);

            console.error(err);
            alert("Error deleting account.");
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <h1 style={{ color: "black" }}>Settings</h1>

                <div>
                    <Button text="Change Password" onClick={() => setShowChangePassword(true)} />
                    {showChangePassword && (
                        <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
                            <div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 style={{ marginTop: 0 }}>Change Password</h2>
                                <ChangePasswordForm />
                                <div style={{ marginTop: "1rem", textAlign: "right" }}>
                                    <Button text="Close" onClick={() => setShowChangePassword(false)} />
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div>
                    <Button text="Logout" onClick={handleLogout} />
                </div>

                <div>
                    {!deleteConfirm ? (
                        <Button text="Delete" onClick={() => setDeleteConfim(true)} />
                    ) : (
                        <div>
                            <p style={{ color: "red" }}>
                                Type <strong>DELETE</strong> below to confirm account deletion.
                            </p>
                            <Input
                                label="Confirm Deletion"
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="Type DELETE"
                            />
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
                                <Button text="Confirm Delete" onClick={handleDeleteAccount} />
                                <Button
                                    text="Cancel"
                                    onClick={() => {
                                        setConfirmText("");
                                        setDeleteConfim(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
