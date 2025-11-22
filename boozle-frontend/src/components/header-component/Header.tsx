import type React from "react";
import './Header.css';

// Components
import MenuButtons from "../menu-buttons-component/MenuButtons";
import Timer from "../timer-component/Timer";

interface HeaderProps {
    gameComplete: boolean
}

const Header: React.FC<HeaderProps> = ({gameComplete}) => {
    return (
        <header className="header"> 
            <div className="title-section">
                <h1>BOOZLE</h1>
                <div className="logo">
                    <img src="src/assets/boozle-logo.svg" alt="Boozle logo" width="30" />
                </div>
            </div>
            <div className="timer-section">
                {/* <h2>Timer:</h2> */}
                <Timer gameComplete={gameComplete} />
            </div>
            <div className="button-container">
                <MenuButtons />
            </div>
        </header>
    );
}

export default Header;