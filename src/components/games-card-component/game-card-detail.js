import React, { Component } from 'react'
import axios from 'axios'
import { Typography } from 'antd'
import ImageDisplay from './image-component';
import LoadingIcon from '../loading-icon/LoadingIcon'
import NotFound from '../error-page/notfound'
const { Title } = Typography
class GameDetails extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            gameName: '',
            gameImage: '',
            gameDesc: '',
            isLoading: true,
            isError: false
        }
    }
    componentDidMount () {
        const theID = parseInt(this.props.match.params.id)
        axios.post(`http://localhost:4000/home/game`, {
                id: theID
        }).then(res => {
            this.setState({ 
                gameName: res.data[0].TicketTypeName,
                gameImage: res.data[0].ImageURL,
                gameDesc: res.data[0].Description,
                isLoading: false,
            
            })
        }).catch(err => {
            console.log(err);
            this.setState({isError: true})
        })
    }
    render() {
    document.title = this.state.gameName
    return (
        this.state.isError === true ? <NotFound /> : 
        <div style={{ margin: '200px',textAlign: 'center' }}>
            <Title style={{ color: '#389e0d', marginTop: 10 }}>
                {this.state.gameName}
            </Title>
            {this.state.isLoading ? <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <LoadingIcon />
                </div>  :
             <ImageDisplay imgURL = {this.state.gameImage} />
             }
            
            <div style = {{ marginTop: '60px'}}>
               <h2><p>{this.state.gameDesc}</p></h2> 
            </div>
        </div>  
    )
}
}

export default GameDetails