import React, { Component } from 'react';
import firebase from 'firebase'
import LoadingIcon from '../loading-icon/LoadingIcon'
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactInfo: [],
            isLoading: true
        }
    }
    componentDidMount() {
        document.title = 'Liên hệ'
        window.scrollTo(0,0);
        var firebaseInfo = firebase.database().ref('contactcontent');
        firebaseInfo.on('value', (snapshot) => { 
            this.setState({
                contactInfo: snapshot.val(),
                isLoading: false
            })
        })
    }
    render() {
        return (
            <div style={{
                marginTop: '100px',
                marginBottom: '220px',
                fontSize: '28px',
                textAlign: 'center'
            }}>
                {this.state.isLoading ? <LoadingIcon /> :
                    <div>
                        <h3><b>{this.state.contactInfo.company_name}</b></h3>
                        <h3>
                            {this.state.contactInfo.physical_address}
                        </h3>
                        <h3>{this.state.contactInfo.phone_mail}</h3>
                    </div>
                }
            </div>
        )
    }
}
export default Contact