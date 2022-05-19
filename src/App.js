import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Books from './components/books';
import Category from './components/categories';

/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> Book store app</h1>
        <Header />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="categories" element={<Category />} />

        </Routes>
      </div>
    );
  }
}

export default App;
