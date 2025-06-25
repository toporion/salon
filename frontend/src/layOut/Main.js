import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Slider from '../components/Slider';
import MenuBar from '../components/MenuBar';

const Main = () => {
    return (
        <div>
            <TopBar/>
            <MenuBar/> 
            <Slider/>  
            <Outlet />
        </div>
    );
};

export default Main;