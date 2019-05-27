/*eslint-disable */
import React, { Component } from 'react';
import './App.css';
import {Divider, Typography, Row} from 'antd';
import GameCard from '../games-card-component/game-cards'
import axios from 'axios';
import LoadingIcon from '../loading-icon/LoadingIcon'
const {Title } = Typography
class Content extends Component { 
    constructor (props) {
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
            console.log(err);    
        })
    }
    render () {
        return (
            <div>
                <Typography align='center'>
                    <Title style={{ color: '#389e0d', marginTop: 10 }}
                    >
                        KHU VUI CHƠI GIẢI TRÍ iTD
                    </Title>
                    <h3 
                    style={{ marginTop: 2 }}
                    >
                    Khu vui chơi giải trí đa dạng bậc nhất Việt Nam
                    </h3>

                    <p> Là nơi sẽ mang đến cho bạn và người thân, gia đình,bạn bè vô vàn niềm vui
                        và kỉ niệm đáng nhớ 
                    </p>

                    <Divider > <h1>Các Hoạt Động Giải Trí</h1> </Divider>

                    <div style={{ padding: '10px' }}>
                        <Row gutter={20} >
                            {
                                this.state.isLoading ? <LoadingIcon /> : 
                                this.state.gamesInformation.map((content, index) => {
                                    return (
                                        content.IsUsed == true ?
                                        <GameCard gameType={content.TicketTypeName}
                                            coverImage={content.ImageURL}
                                            ticketID = {content.TicketTypeID}
                                            description = {content.Description}
                                            key={index}
                                        /> :null
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <Divider dashed />
                    <p>WE ARE IN THE END GAME NOW</p>
                </Typography>
            </div>
        )
    }
}

export default Content