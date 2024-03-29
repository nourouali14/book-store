import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/28/2024/03/shutterstock_2137897061-888x444.jpg?ver=240304225254" alt="" />
                </div>
                <div>
                    <p className="about-text">
                    We are dedicated to being the best public library for the communities we serve by providing outstanding and personalized service to everyone seeking access to the world of information and ideas. <br/>
                        <br/>
                        We focus on our customers and anticipate their needs. We value innovation, collaboration and equity. We act with courage, respect, empathy and passion. <br/>
                        <br/>
                        We believe we can turn every search for knowledge into a helpful adventure.<br/>
                        <br/>
                        Your suggestions for improvement are always welcome!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About