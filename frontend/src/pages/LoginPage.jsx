import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

const Login = () => {

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(loginFormData);
        
    }

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <div>
                    <form action="" onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={loginFormData.email}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            value={loginFormData.password}
                            onChange={handleChange}
                        />
                        <Button
                            text="Login Here"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login