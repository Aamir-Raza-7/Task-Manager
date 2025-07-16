import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

const Signup = () => {

    const [SignUpFormData, setSignUpFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        ConfirmedPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(SignUpFormData);
    }

    return (
        <>
            <div className="signup-container">
                <h1>Sign Up</h1>
                <div>
                    <form action="" onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            label="Name"
                            name="name"
                            value={SignUpFormData.name}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            label="Username"
                            name="username"
                            value={SignUpFormData.username}
                            onChange={handleChange}
                        />
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={SignUpFormData.email}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            value={SignUpFormData.password}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            label="Confirmed Password"
                            name="ConfirmedPassword"
                            value={SignUpFormData.ConfirmedPassword}
                            onChange={handleChange}
                        />
                        <Button
                            text="Sign Up Here"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup