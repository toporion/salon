import React from 'react';
import Welecome from '../../components/Welecome';
import ThreeServices from '../../components/ThreeServices';
import Services from '../../components/Services';
import Pricing from '../../components/Pricing';
import StatCounter from '../../components/StatCounter';
import Slider from '../../components/Slider';
import Experts from '../../components/Experts';
import SpecialOffer from '../../components/SpecialOffer';
import OurGallery from '../../components/OurGallery';
import Products from '../../components/Products';
import WhatPeopleSay from '../../components/WhatPeopleSay';
import ContactUs from '../../components/ContactUs';
import OurClient from '../../components/OurClient';
import ContactBadge from '../../components/ContactBadge';



const Home = () => {
    return (
        <div>
            <Slider/>  
            <Welecome/>
            <ThreeServices/>
            <Services/>
            <Pricing/>
            <StatCounter/>
            <Experts/>
            <SpecialOffer/>
            <OurGallery/>
            <Products/>
            <WhatPeopleSay/>
            <ContactUs/>
            <OurClient/>
            <ContactBadge/>
        </div>
    );
};

export default Home;