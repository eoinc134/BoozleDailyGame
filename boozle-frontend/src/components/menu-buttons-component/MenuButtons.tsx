import './MenuButtons.css';
import type React from "react";

// MUI Icons
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/StarOutline';
import LoginIcon from '@mui/icons-material/Login';

const MenuButtons: React.FC = () => {
    return (
        <div className="menu-buttons">
            <Button className="secondary-button" variant="outlined" startIcon={<InfoIcon />} />
            <Button className="secondary-button"  variant="outlined" startIcon={<StarIcon />} />
            <Button className="primary-button" variant="contained"  startIcon={<LoginIcon />} />
        </div>
    );
}

export default MenuButtons;