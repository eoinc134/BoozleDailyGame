import './HintButtons.css';
import type React from "react";

// MUI Icons
import { Button } from '@mui/material';
import { DoubleArrow } from "@mui/icons-material";

const HintButtons: React.FC = () => {
    return (
        <div className="hint-buttons">
            <Button className="used-button" title='Hint 1: Cocktail Name' variant="outlined" startIcon={<DoubleArrow />} disabled />
            <Button className="current-button" title='Hint 2: Cocktail Instructions'  variant="outlined" startIcon={<DoubleArrow />} />
            <Button className="disabled-button" title='Hint 3: Cocktail Photo' variant="outlined"  startIcon={<DoubleArrow />} disabled />
        </div>
    );
}

export default HintButtons;