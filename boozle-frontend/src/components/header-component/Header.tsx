import type React from "react";
import './Header.css';

// Components
import MenuButtons from "../menu-buttons-component/MenuButtons";
import Timer from "../timer-component/Timer";

const Header: React.FC = () => {
    return (
        <header className="header"> 
            <div className="title-section">
                <h1>BOOZLE</h1>
                <div className="logo">
                    <img src="src/assets/boozle-logo.svg" alt="Boozle logo" width="30" />
                </div>
            </div>
            <div className="timer-section">
                <Timer />
            </div>
            <div className="button-container">
                <MenuButtons />
            </div>
        </header>
    );
}

export default Header;