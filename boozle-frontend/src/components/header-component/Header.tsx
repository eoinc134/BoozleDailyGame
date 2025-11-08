import type React from "react";
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header"> 
        <div className="header-content">
            <h1>Boozle</h1>
        </div>
        </header>
    );
}

export default Header;