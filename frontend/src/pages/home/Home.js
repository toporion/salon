import React from 'react';
import Welecome from '../../components/Welecome';
import ThreeServices from '../../components/ThreeServices';
import Services from '../../components/Services';
import Pricing from '../../components/Pricing';
import StatCounter from '../../components/StatCounter';

const Home = () => {
    return (
        <div>
            <Welecome/>
            <ThreeServices/>
            <Services/>
            <Pricing/>
            <StatCounter/>
        </div>
    );
};

export default Home;