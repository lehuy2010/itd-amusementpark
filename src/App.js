import React, { Component } from 'react';
import './App.css';
import PageHeader from './components/Header'
import PageFooter from './components/Footer'
import BookForm from './components/booking-form';
import Homepage from './components/homepage-body';
import GamesServices from './components/game-services-page';
// import  { Layout } from 'antd'
import {Route} from 'react-router-dom'
import Introduction from './components/introduction';
import Contact from './components/contacts';
import AboutUs from './components/about-us';
// const {
//    Content, Header, Footer
// } = Layout
class App extends Component {
  render() {
    return (
      <div>
        <PageHeader />
        <div className='push'> </div>
        <Route exact path = "/" component = {Homepage} />
        <Route path = "/book" component = {BookForm} />
        <Route path = "/introduction" component = {Introduction} />
        <Route path = "/games" component = {GamesServices} />
        <Route path = "/contact" component = {Contact } />
        <Route path = "/about-us" component = {AboutUs} />
        <div className="push"></div>
        <PageFooter />
      </div>
    );
  }
}

export default App;
