import React from "react";
import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import { Logo } from "../components/index";
import { Link } from "react-router-dom";


const Landing = () => {

    return (

        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Money <span>tracking</span> app
                    </h1>
                    <p>
                        track your finances how many there are and how wide you are
                    </p>
                    <Link to="/register">
                        <button className="btn btn-hero">Login/Register</button>
                    </Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    )
}



export default Landing;