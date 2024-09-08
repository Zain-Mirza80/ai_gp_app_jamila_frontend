import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{ backgroundColor: '#000000', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>HealthChat</h1>
            <nav>
                <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
                <Link to="/patient-chat" style={{ marginRight: '20px' }}>Patient Chat</Link>
                <Link to="/doctor-login">Doctor Login</Link>
            </nav>
        </header>
    );
}

export default Header;
