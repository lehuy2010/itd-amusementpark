/*eslint-disable */
import React from 'react';
import '../App.css';
import {Avatar, Row, Col, Layout, Divider} from 'antd'
import PersonalData from '../files/personal-info.json'
// const loadingIcon = <Icon type="loading" style={{ fontSize: 48, marginLeft: '4px' }} spin />;

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
                                        src={require("../image/Avatar/" + data.coverPhoto)}
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