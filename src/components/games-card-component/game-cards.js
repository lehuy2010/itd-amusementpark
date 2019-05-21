import React, { Component } from 'react'
import {Card, Col, Button} from 'antd'
import { Route, Link, Redirect } from "react-router-dom";
import GameDetails from './game-card-detail'
const {Meta} = Card



class GameCard extends Component { 
    constructor(props) {
        super(props) 
        this.state = {
        }
    }
    handleClick = (e) => {
        console.log('vừa click');
        console.log(this.props.gameType)
        console.log(this.props.ticketID);
        const {ticketID} = this.props;
        // return (
        //     <Link to = {`/games/${this.props.ticketID}`} ></Link> 
        // )
         
    }

    

    render() {
        return ( 

        <Col span = {6} >
        <Link to = {`/games/${this.props.ticketID}`} >
        <Card
                    hoverable
                    style = {{width: '100%', textAlign: 'center', marginTop: '16px'}}
                    cover = {
                    <img alt = '' src = {require('./images/'+ this.props.coverImage)} 
                    style = {{height: '300px', width: '316px'}} />}
                    >
                    <Meta 
                        title = {this.props.gameType}
                        style = {{marginTop: 30,
                        marginBottom : 20,}}
                    />
                    
        </Card>
        </Link>
        </Col>
           
        )
    }
}

export default GameCard
