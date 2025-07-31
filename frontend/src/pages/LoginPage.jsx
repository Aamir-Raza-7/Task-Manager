import Input from "../components/Input";
import Button from "../components/Button";
import { data, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboardPage");
        }
    }, []);

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
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
        if (!loginFormData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!loginFormData.password) {
            newErrors.password = "Password is required";
        } else if (loginFormData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
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
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginFormData)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            console.log("Login successful", data);
            localStorage.setItem("token", data.token);
            navigate("/dashboardPage");
        } catch (error) {
            console.error("Error during login", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    type="password"
                    label="Password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <Button text="Login Here" />
                <p style={{ color: "#fff" }}>
                    Don't have an Account? <span style={{ color: "#00bfff", cursor: "pointer" }} onClick={() => navigate('/signupPage')}>Sign up</span>
                </p>

            </form>
        </div>
    );
};

export default LoginPage;
