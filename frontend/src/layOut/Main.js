import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import MenuBar from '../components/MenuBar';
import Footer from '../pages/footer/Footer';

const Main = () => {
    return (
        <div>
            <TopBar/>
            <MenuBar/> 
            
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Main;