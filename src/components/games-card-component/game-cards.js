import React, { Component } from 'react'
import {Card, Col} from 'antd'
import {Link} from "react-router-dom";
const {Meta} = Card
class GameCard extends Component { 
    render() {
        return ( 

        <Col span = {6} >
        <Link to = {`/games/${this.props.ticketID}`} >
        <Card
                    hoverable
                    style = {{width: '100%', textAlign: 'center', marginTop: '16px'}}
                    cover = {
                    <img alt = '' src = {require('../../images/'+ this.props.coverImage)} 
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
