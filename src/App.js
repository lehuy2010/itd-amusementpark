import React, { Component } from 'react';
import './App.css';
import PageHeader from './components/Header'
import PageFooter from './components/Footer'
import BookForm from './components/bookingForm';
class App extends Component {
  render() {
    return (
      <div>
        <PageHeader />
        <div className = "wrapper">
        <BookForm />
        </div>
        <div className = "push"></div>
        <PageFooter />
      </div>
    );
  }
}

export default App;
