import './MenuButtons.css';
import React from "react";

// MUI Icons
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/StarOutline';
import LoginIcon from '@mui/icons-material/Login';
import GameInfoModal from '../game-info-modal/GameInfoModal';

const MenuButtons: React.FC = () => {
    // Info Modal
    const [infoModalOpen, setInfoModalOpen] = React.useState(false);
    const handleInfoModalOpen = () => setInfoModalOpen(true);

    return (
        <div className="menu-buttons">
            <Button className="secondary-button" variant="outlined" startIcon={<InfoIcon />} onClick={handleInfoModalOpen} />
            <Button className="secondary-button"  variant="outlined" startIcon={<StarIcon />} />
            <Button className="primary-button" variant="contained"  startIcon={<LoginIcon />} />

            <GameInfoModal modalOpen={infoModalOpen} onModalClosed={(value) => setInfoModalOpen(value)}></GameInfoModal>
        </div>
    );
}

export default MenuButtons;