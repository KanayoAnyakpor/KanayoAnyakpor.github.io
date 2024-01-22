import React from 'react';
import LeagueOfLegends from './imgs/LeagueOfLegends.jpg';

export default function Landing()
{
    return (
        <div className="landing-container">
            <img className="landing-image" src={LeagueOfLegends} alt="Landing" />
            <div className="overlay"></div>
        </div>
    );
};


