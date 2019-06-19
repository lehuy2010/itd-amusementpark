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
import AdminLoginForm from './components/administrator-page/admin-login-form';
import AdminLayout from './components/administrator-page/admin-layout';
import UserInformation from './components/administrator-page/user-information';
import HomepageModify from './components/administrator-page/homepage-modify';
import IntroductionModify from './components/administrator-page/introduction-modify';
import ContactModify from './components/administrator-page/contact-modify';
import TicketModify from './components/administrator-page/ticket-modify';
import AddGame from './components/administrator-page/add-game';
class App extends Component {
  render() {
    return (
      <Router>
        <div>

        <PageHeader />
        <div className='push'> </div>
        <Switch>
            
            <Route exact path="/" component={Homepage} />
            <Route exact path="/introduction" component={Introduction} />
            <Route exact path="/games" component={GamesServices} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/prices" component={PriceTable} />
            <Route exact path="/games/:id" component={GameDetails} />
            <Route exact path="/book" component={BookForm} />
            <Route exact path="/login" component = {AdminLoginForm} />
            
           
            
            <AdminLayout path='/admin'>
            <Switch>
              <Route exact path = "/admin/user" component = {UserInformation} />
              <Route exact path = "/admin/home-modify" component = {HomepageModify} />
              <Route exact path = "/admin/introduction-modify" component = {IntroductionModify} />
              <Route exact path = "/admin/contact-modify" component = {ContactModify} />
              <Route exact path = "/admin/ticket-modify" component = {TicketModify} />
              <Route exact path = "/admin/add-game" component = {AddGame} />
              <Route component = {NotFound} />
              </Switch>
            </AdminLayout>
              
            <Route component = {NotFound} />
          
            
        </Switch>
        
        <PageFooter />
      </div>
      </Router>
      
    );
  }
}

export default App;
