import React, { Component } from 'react'
import '../App.css'
import {Card, Col} from 'antd'

const {Meta} = Card
/*eslint-disable */

class GameCard extends Component { 
    constructor(props) {
        super(props) 
        this.state = {
        }

     this.showGameCard = this.showGameCard.bind(this)

    }
    showGameCard() {
        return (
        <Col span = {6} >
            <Card
            hoverable
            style = {{width: '100%', textAlign: 'center', marginTop: '16px'}}
            cover = {
            <img 
            alt = 'KidPlaygroup'
            src = {require('../image/Games/'+ this.props.coverImage)}
            style = {{height: '300px', width: '316px'}}
            />
            }
            >
            <Meta 
                title = {this.props.gameType}
                style = {{marginTop: 30,
                 marginBottom : 20,}}
            />
            </Card>
        </Col>
        )
    }

    render() {
        return (
            this.showGameCard(this.props.gameType, this.props.coverImage)
        )
    }
}

export default GameCard