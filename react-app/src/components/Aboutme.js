import React from "react";
import './css/aboutme.css'
import MyImg from '../images/IMG_8333.jpg'
import GitHub from '../images/GitHub-Mark-120px-plus.png'
import LinkedIn from '../images/new-linkedin-logo-white-black-png.png'
import { Link, NavLink } from "react-router-dom";
const AboutMe = () => {
    return (
        <div className="aboutMePage">
            <div className="aboutMeName">
                <h1>Agustin Zucca</h1>
                <h3>Software Engineer Located in Houston, TX</h3>
            </div>
            <div >
                <img src={MyImg} className="aboutMeImg"></img>
            </div>
            <div className="aboutMeInfo">
                <h3>I am a software engineer that loves travelling; therefore, deciding to remake the most known vacation rental service was an easy choice for me. Check out more of my work in the links below:    </h3>
            </div>
            <div className="icons">
                <div>
                    <a href='https://github.com/AgustinZucca'>
                    <img src={GitHub}/>
                    </a>
                </div>
                <div>
                    <a href='https://www.linkedin.com/in/agustinzucca/'>
                    <img src={LinkedIn} className='linkedinIcon'/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AboutMe