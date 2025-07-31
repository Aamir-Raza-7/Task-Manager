import Input from "../components/Input";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const SignupPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                navigate("/dashboardPage");
            }
        }, []);

    const [signupFormData, setSignupFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!signupFormData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!signupFormData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!signupFormData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(signupFormData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!signupFormData.password) {
            newErrors.password = "Password is required";
        } else if (signupFormData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!signupFormData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (signupFormData.password !== signupFormData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupFormData)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed");
                return;
            }
            
            console.log("Signup successful", data);
            localStorage.setItem("token", data.token);
            navigate("/DashboardPage");
        } catch (error) {
            console.error("Error during signup", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <Input
                    type="text"
                    label="Name"
                    name="name"
                    value={signupFormData.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <Input
                    type="text"
                    label="Username"
                    name="username"
                    value={signupFormData.username}
                    onChange={handleChange}
                    error={errors.username}
                />
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={signupFormData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    type="password"
                    label="Password"
                    name="password"
                    value={signupFormData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={signupFormData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />
                <Button text="Signup Here" />
                <p style={{ color: "#fff" }}>
                    Already have an account? <span style={{ color: "#00bfff", cursor: "pointer" }} onClick={() => navigate('/')}>Login</span>
                </p>

            </form>
        </div>
    );
};

export default SignupPage;
