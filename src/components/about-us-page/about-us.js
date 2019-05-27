/*eslint-disable */
import React from 'react';
import {Avatar, Row, Col, Layout, Divider} from 'antd'
import PersonalData from './personal-info'

const AboutUs = () => {
        document.title = 'Về chúng tôi'
        window.scrollTo(0,0);
        return (
            <div>
                <Layout>
                    <Layout>
                        {PersonalData.map((data, index) => {
                            return ( 
                                <Row 
                                span={6} 
                                key={data.key} 
                                style = {{background: 'white'}}
                                >
                                <Divider
                                 style = {{fontSize: '32px'}}
                                 orientation = 'left'
                                 >
                                 {data.name}
                                 </Divider>
                                 <div >
                                     <Col span = {8}>
                                     <Avatar
                                        align = 'left'
                                        shape = 'square'
                                        size={240}
                                        src={require('./images/' + data.coverPhoto)}
                                        key={index}
                                        style={{
                                            margin: '30px',
                                            marginLeft: '50px'
                                        }}
                                    />
                                    </Col>
                                    <Col span = {16}>
                                    <h3 >{data.description}</h3>
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
export default AboutUs