
import React, {Component} from 'react'
import './App.css'
import { Typography, Timeline, Divider, Carousel  } from 'antd'
import firebase from 'firebase'
import LoadingIcon from '../loading-icon/LoadingIcon'
const {Title} = Typography;

class Introduction extends Component {
    constructor(props) { 
        super(props)
        this.state = { 
            introContent: [],
            isLoading: true
        }

    }
    componentDidMount() {
        document.title = 'Giới thiệu'
        window.scrollTo(0,0);
        var firebaseInfo = firebase.database().ref('introductioncontent');
        firebaseInfo.on('value', (snapshot) => { 
            console.log('tại đây snapsohot: ', snapshot.val());
            this.setState({
                introContent: snapshot.val(),
                isLoading: false
            })
        })
    }
    render () { 
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            draggable: true
          };
        return (
            <div>
                {this.state.isLoading ? <LoadingIcon /> : 
                
                        <Typography align='center'>
                            <img src={require('./images/introduction-default.png')} alt="" />
                            <Title className='introduction-title'
                            >
                               {this.state.introContent.introduction_title_1}
                            </Title>
                            <p style={{ marginLeft: '320px', marginRight: '320px', marginBottom: '70px' }} >
                                {this.state.introContent.introduction_subtitle_1} </p>
                            <Divider><Title style={{ color: '#389e0d' }}>
                                {this.state.introContent.introduction_title_2}
                            </Title></Divider>
                        </Typography>
                    
                }
                <div>
                    <Timeline style={{ marginLeft: '40%' }}>

                        <Timeline.Item color='green' >
                                <b>11/01/1997</b>: Khu vui chơi bắt đầu đi vào quá trình xây dựng
                        </Timeline.Item>

                        <Timeline.Item color='green' >
                                <b>20/03/2002</b>: Chính thức hoàn thành xây dựng
                        </Timeline.Item>

                        <Timeline.Item color='green' >
                                <b> 02/09/2002</b>: Nhân dịp kỷ niệm quốc khánh nước CHXHCN Việt Nam 2 tháng 9,<br/> Du 
                                Lịch Văn Hóa Suối Tiên chính thức mở cửa đón du khách từ mọi miền
                                đến tham quan. 
                        </Timeline.Item>
                    </Timeline>
                </div>
            <Carousel {...settings}
            style = {{
                height: '368px',
                background: '#262626',
                overflow: 'hidden',
                width: 'fit-content'
            }}
            autoplay
            >
                    <div>
                        <img src={require('./images/introduction-slider-1.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
                    <div>
                        <img src={require('./images/introduction-slider-2.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
                    <div>
                        <img src={require('./images/introduction-slider-3.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
                    <div>
                        <img src={require('./images/introduction-slider-4.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
                    <div>
                        <img src={require('./images/introduction-slider-5.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
                    <div>
                        <img src={require('./images/introduction-slider-6.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
                    <div>
                        <img src={require('./images/introduction-slider-7.jpg')}
                            alt='' className='picture-introduction' />
                    </div>
            </Carousel>
            </div>
        )
    }
}

export default Introduction