import type React from "react";
import './Header.css';
import logo from '../../assets/boozle-logo.svg';

// Components
import MenuButtons from "../menu-buttons-component/MenuButtons";

const Header: React.FC = () => {
    return (
        <header className="header"> 
            <div className="title-section">
                <h1>BOOZLE</h1>
                <div className="logo">
                    <img src={logo} alt="Boozle logo" width="30" />
                </div>
            </div>
            <div className="button-container">
                <MenuButtons />
            </div>
        </header>
    );
}

export default Header;