import React from 'react'
import logo from "../assets/logo.svg"

const Logo = ({className, height}) => {
    return (
        <div className= {className}>
            <a>
                <img src= {logo} alt="logo" height={height}/>
            </a>
        </div> 
    )
}

export default Logo