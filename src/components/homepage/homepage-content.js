/*eslint-disable */
import React, { Component } from 'react';
import './App.css';
//import firebase from '../firebase.js'
import firebase from 'firebase'
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
            isLoading: true,
            content: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/home`)
        .then(response => {
            this.setState({ 
                gamesInformation: response.data,
            })
        }).catch(err => {
            console.log(err);    
        })

        var contentData = firebase.database().ref('homecontent');
        contentData.on('value', (snapshot) => {
            let line = snapshot.val();
            this.setState({
                content: line,
                isLoading: false
            })
        })
    }
    render () {
        return (
            <div>
            {this.state.isLoading ? <LoadingIcon /> : 
                <Typography align='center'>
                    
                    <Title style={{ color: '#389e0d', marginTop: 10 }}
                    >
                        {this.state.content.homepage_title_1}
                    </Title>

                    <h3 
                    style={{ marginTop: 2 }}
                    >
                        {this.state.content.homepage_title_2}
                    </h3>

                    <p> {this.state.content.homepage_subtitle}
                    </p>

                    <Divider > <h1>{this.state.content.homepage_game_title}</h1> </Divider>
                    
                    <div style={{ padding: '10px' }}>
                        <Row gutter={20} >
                            {
                                this.state.isLoading ? <LoadingIcon /> : 
                                this.state.gamesInformation.map((data, index) => {
                                    return (
                                        data.IsUsed == true ?
                                        <GameCard gameType={data.TicketTypeName}
                                            coverImage={data.ImageURL}
                                            ticketID = {data.TicketTypeID}
                                            description = {data.Description}
                                            key={index}
                                        /> :null
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <Divider dashed />
                    <p>WE ARE IN THE END GAME NOW</p>
                </Typography>}
            </div>
        )
    }
}

export default Content