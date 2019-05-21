import React from 'react'

const NotFound = () => {
    document.title = 'Error'
    return (
      <div style = {{margin: '200px'}}>
        <h1>OOPS</h1>
        <p>Sorry, this page isn't here </p>
    </div>  
    )
}

export default NotFound