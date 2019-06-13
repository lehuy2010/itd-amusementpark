/*eslint-disable */
import React, { Component } from 'react';
import {Avatar, Row, Col, Layout, Divider} from 'antd'
import firebase from 'firebase'
import LoadingIcon from '../loading-icon/LoadingIcon'

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalInfo: [],
            isLoading: true,
        }
    }
    componentDidMount() {
        document.title = 'Về chúng tôi'
        window.scrollTo(0, 0);
        var firebaseInfo = firebase.database().ref('aboutuscontent');
        firebaseInfo.on('value', (snapshot) => { 
            this.setState({
                personalInfo: snapshot.val(),
                 isLoading: false
            })
        })
    }

    render() {
        return (
            <div>
                <Layout>
                    <Layout>
                        
                        {this.state.isLoading ? <LoadingIcon />
                        
                        :this.state.personalInfo.map((data, index) => { 
                            return (
                                <Row
                                    span={6}
                                    key={data.id}
                                    style={{ background: 'white' }}
                                >
                                    <Divider
                                        style={{ fontSize: '32px' }}
                                        orientation='left'
                                    >
                                        {data.information.name} 
                                    </Divider>
                                    <div >
                                        <Col span={8}>
                                            <Avatar
                                                align='left'
                                                shape='square'
                                                size={240}
                                                src={require('../../images/' + data.information.coverPhoto)}
                                                key={index}
                                                style={{
                                                    margin: '30px',
                                                    marginLeft: '50px'
                                                }}
                                            />
                                        </Col>
                                        <Col span={16}>
                                            <h3 >{data.information.description}
                                            </h3>
                                        </Col>
                                    </div>
                                </Row>
                            )
                        })}
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default AboutUs