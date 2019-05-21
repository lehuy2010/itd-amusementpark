import React, {Component} from 'react'


class ImageDisplay extends Component {
    render() {
    console.log('./images/' + this.props.imgURL);
    return (
        <div>
            <img alt = '' src = {require('./images/' + this.props.imgURL)}
            style = {{height: '300px', width: '316px'}} /> 
        </div>
    )
    }
    
}

export default ImageDisplay