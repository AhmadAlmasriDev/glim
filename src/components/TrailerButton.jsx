import React from 'react'

const TrailerButton = ({type}) => {
  return (
    <div className={`flex-container`}>
        <a className={`flex-container`}>
            <div className={`flex-container`}>
                <i className="fa-brands fa-youtube"></i>
                <p>Watch trailer L</p>
            </div>
        </a>
    </div>
  )
}

export default TrailerButton