import React from 'react'
import logo from "../assets/logo.svg"

const Logo = ({className, height}) => {
    return (
        <div className= {className}>
            <img src= {logo} alt="logo" height={height}/>
            
        </div> 
    )
}

export default Logo