import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from '../components/index';
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext.js";


const initialState = {
    name: "",
    email: "",
    profession: "",
    password: "",
    isMember: true,
};

const Register = () => {

    const [values, setValues] = useState(initialState);

    const { isLoading, showAlert, displayAlert, setUpUser, user } = useAppContext();


    const navigate = useNavigate();


    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        setValues({ ...values, [e.target.name]: [e.target.value] })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let { name, email, password, profession, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }

        name = name.toString();
        email = email.toString();
        password = password.toString();
        profession = profession.toString();

        const currentUser = { name, email, password, profession };
        if (isMember) {
            setUpUser(currentUser, "login")
        } else {
            setUpUser(currentUser, "register");
        }

    };


    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user, navigate]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>
                {showAlert && <Alert />}

                {/* name field */}
                <div className="form-row">
                    {/* toggle name */}
                    {!values.isMember && (
                        <FormRow
                            type="text"
                            name="name"
                            value={values.name}
                            handleChange={handleChange}
                        />
                    )}
                    {/* toggle profession */}
                    {!values.isMember && (
                        <FormRow
                            type="text"
                            name="profession"
                            value={values.profession}
                            handleChange={handleChange}
                        />
                    )}
                    <FormRow
                        type="text"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type="password"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    submit
                </button>
                <p>user: avi@gmail.com <br /> password: 111111</p>

                <p>
                    {values.isMember ? "Not a member yet?" : "Already a member?"}

                    <button type="button" onClick={toggleMember} className="member-btn">
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
