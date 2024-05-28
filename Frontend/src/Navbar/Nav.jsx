import React from 'react';
import { Outlet } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';

const Nav = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Nav