import React, { useState } from 'react';
import Header from '../../components/header/Header';
import NavBar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import './main.css';

function Main() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div>
      <section className='grid-container'>
        <button className={`toggle-button ${showNav ? 'hidden' : ''}`} onClick={toggleNav}>
          <img src={menu} alt='menu' />
        </button>

        <nav className={`nav ${showNav ? 'nav-show' : ''}`}>
          <NavBar />
        </nav>

        <div className='header-outlet-container'>
          <div className='grid-display'>
            <header className='header'>
              <Header />
            </header>

            <div className='outlet'>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
