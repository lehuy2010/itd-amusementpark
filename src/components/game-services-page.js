/*eslint-disable */
import React, { Component } from 'react';
import '../App.css';
import {Card, Col, Row, Divider} from 'antd'
import axios from 'axios'
const {Meta} = Card

class GamesServices extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            gamesInformation: []
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:4000/home`)
        .then(response => {
            this.setState({ 
                gamesInformation: response.data
            })
        }).catch(err => {
            console.log('thất bại');    
        })
    }

    render() {
        return (
            <div style={{ padding: '10px' }}>
                <Divider orientation = "left"
                style = {{fontSize: '36px'}} >Các trò chơi </Divider>
                <Row gutter={16} >
                    {
                    this.state.gamesInformation.map((content, index) => {
                        return (
                            <Col span={6} >
                                <Card
                                    hoverable
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        marginTop: '16px',
                                    }}
                                    cover={<img alt='KidPlaygroup' 
                                    src={require('../image/ca-chep-nhao-lon.jpg')}
                                     />}
                                >
                                    <Meta
                                        title={content.TicketTypeName}
                                        style={{
                                            marginTop: 30,
                                            marginBottom: 20,
                                        }}
                                    />
                                </Card>
                            </Col>
                        )
                    })
                    }
                </Row>
            </div>
        )
    }
}
export default GamesServices