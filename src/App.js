import React, { Component } from 'react';
import './App.css';
import PageHeader from './components/header/Header'
import PageFooter from './components/footer/Footer'
import BookForm from './components/ticket-book-page/booking-form';
import Homepage from './components/homepage/homepage-body';
import GamesServices from './components/games&services-page/game-services-page';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Introduction from './components/introduction-page/introduction';
import Contact from './components/contacts-page/contacts';
import AboutUs from './components/about-us-page/about-us';
import PriceTable from './components/ticket-price-page/ticket-price';
import GameDetails from './components/games-card-component/game-card-detail';
import NotFound from './components/error-page/notfound';
import AdminLayout from './components/administrator-page/admin-layout';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        {/* <Switch>
          <Route exact path = "/admin" component = {AdminLayout} />
        </Switch> */}
        <PageHeader />
        <div className='push'> </div>
        <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/book" component={BookForm} />
            <Route exact path="/introduction" component={Introduction} />
            <Route exact path="/games" component={GamesServices} />
            
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/prices" component={PriceTable} />
            <Route path="/games/:id" component={GameDetails} />
            <Route component = {NotFound} />
        </Switch>
        
        <div className="push"></div>
        <PageFooter />
      </div>
      </Router>
      
    );
  }
}

export default App;
