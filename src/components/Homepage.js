import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinks.jpeg'

function Homepage() {
    return (
        <div className="home-container">
            <div className="home-text">
                <h1>Wherever You Wander, Find the Perfect Drink!</h1>
                <p>
                    Whether you're exploring a new city or revisiting your favorite spots, 
                    our app guides you to the best bars and cocktails in town. From classic 
                    concoctions to local specialties, embark on a liquid adventure and raise 
                    your glass to unforgettable experiences with Tipsy Traveler. Cheers to exploring the world, one drink at a time!
                </p>
                <Link to="/bars">
                    <button className="view-bars-btn">View Bars</button>
                </Link>
            </div>
            <div className="home-image">
                {/* Replace with your desired image */}
                <img src={drinks} alt="Descriptive Alt Text" />
            </div>
        </div>
    );
}

export default Homepage;