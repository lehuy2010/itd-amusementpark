import React, { Component } from 'react'
import {Card, Col} from 'antd'
import { Route, Link } from "react-router-dom";
import GameDetails from './game-card-detail'
const {Meta} = Card



class GameCard extends Component { 
    constructor(props) {
        super(props) 
        this.state = {
        }

     this.showGameCard = this.showGameCard.bind(this)
     
    }
    handleClick = () => {
        console.log('vừa click');
        console.log(this.props.gameType)
        console.log(this.props.ticketID);
    }

    showGameCard() {
        return (
        <Col span = {6} >
            <Card
            hoverable
            style = {{width: '100%', textAlign: 'center', marginTop: '16px'}}
            cover = {
            <img alt = '' src = {require('./images/'+ this.props.coverImage)} 
            style = {{height: '300px', width: '316px'}} />}
            onClick = {this.handleClick}
            >
            <Meta 
                title = {this.props.gameType}
                style = {{marginTop: 30,
                 marginBottom : 20,}}
            />
            <Link to = '/some:id'></Link>
            </Card>
        </Col>
        )
    }

    render() {
        return (
            this.showGameCard(this.props.gameType, this.props.coverImage, this.props.ticketID)
        )
    }
}

export default GameCard