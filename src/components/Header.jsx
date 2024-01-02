import React from 'react';
import { Link } from 'react-router-dom';
import './scss/Header.scss';
import './Routes/scss/Style.scss'
import './Routes/NewBook'

function Header() {
  return (
    <nav>
      <div className="header-container">
        <div>
          <Link className="title_link" to="/">
            Bookstore CMS
          </Link>
        </div>
        <div className="links-container">
          <Link className="link" to="/">
            BOOKS
          </Link>
          <Link className="link" to="/categories">
            CATEGORIES
          </Link>
        </div>
        <div>
          <Link className="link" to="/Newbook">
           <button className='add-book'>ADD BOOK</button> 
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
