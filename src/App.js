import React, { Component } from 'react';
import './App.css';
import PageHeader from './components/header/Header'
import PageFooter from './components/footer/Footer'
import BookForm from './components/ticket-book-page/booking-form';
import Homepage from './components/homepage/homepage-body';
import GamesServices from './components/games&services-page/game-services-page';
import {Route} from 'react-router-dom'
import Introduction from './components/introduction-page/introduction';
import Contact from './components/contacts-page/contacts';
import AboutUs from './components/about-us-page/about-us';
import PriceTable from './components/ticket-price-page/ticket-price';
import GameDetails from './components/games-card-component/game-card-detail';
class App extends Component {
  render() {
    return (
      <div>
        <PageHeader />
        <div className='push'> </div>
        <Route exact path = "/" component = {Homepage}  />
        <Route path = "/book" component = {BookForm}  />
        <Route path = "/introduction" component = {Introduction}  />
        <Route path = "/games" component = {GamesServices}  />
        <Route path = "/contact" component = {Contact }  />
        <Route path = "/about-us" component = {AboutUs}  />
        <Route path = "/prices" component = {PriceTable} />
        <Route path = "/some:id" component = {GameDetails} />
        <div className="push"></div>
        <PageFooter />
      </div>
    );
  }
}

export default App;
