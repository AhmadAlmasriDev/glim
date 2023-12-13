import React from 'react'

const Like = ({liked}) => {
  return (
    <div className={`flex-container`}>
      { {liked} ? <i class="fa-regular fa-heart"></i> : <i class="fa-solid fa-heart"></i>}
      <p>32</p>
    </div>
  )
}

export default Like