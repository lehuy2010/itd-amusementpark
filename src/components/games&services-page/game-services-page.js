/*eslint-disable */
import React, { Component } from 'react';
import {Icon, Spin, Row, Divider} from 'antd'
import axios from 'axios'
import GameCard from '../games-card-component/game-cards'
const loadingIcon = <Icon type="loading" style={{ fontSize: 48, marginLeft: '4px' }} spin />;
class GamesServices extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            gamesInformation: [],
            isLoading: true
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:4000/home`)
        .then(response => {
            this.setState({ 
                gamesInformation: response.data,
                isLoading: false
            })
        }).catch(err => {
            console.log('thất bại');    
        })
    document.title = 'Trò chơi & dịch vụ'
    
    }

    render() {
        return (
             
            <div style={{ padding: '10px' }}>
                <Divider orientation = "left"
                style = {{fontSize: '36px'}} >Các trò chơi </Divider>
                {this.state.isLoading ? <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Spin
                        indicator = {loadingIcon}
                    />
                </div>  :
                <Row gutter={16} >
                    {
                        this.state.gamesInformation.map((content, index) => {
                            return (
                                content.IsUsed == true ?  
                                <GameCard gameType={content.TicketTypeName}
                                    coverImage={content.ImageURL}
                                    ticketID = {content.TicketTypeID}
                                    description = {content.Description}
                                    key={index}
                                /> : null
                                
                            )
                        })
                    }
                    
                </Row>}
            </div>
        )
    }
}
export default GamesServices