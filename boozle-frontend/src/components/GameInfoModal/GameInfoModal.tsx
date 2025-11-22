import { Box, Modal, Typography } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    bgcolor: '#1E1E1E' ,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
}

interface GameInfoModalProps {
    modalOpen: boolean;
    onModalClosed: (closed: boolean) => void;
}

const GameInfoModal: React.FC<GameInfoModalProps> = ({modalOpen, onModalClosed}) => {
    const handleClose = () => {
        onModalClosed(false)
    }

    return(
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Welcome to Boozle!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Boozle is a daily cocktail guessing game.
                    </Typography>
                    <Typography id="modal-modal-description">
                        Each day, a new cocktail is chosen — your goal is to figure out which one it is!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontWeight: 'bold', mt: 2}}>
                        Rules:
                    </Typography>
                    <Typography id="modal-modal-description">
                        <ul style={{ margin: 0 }}>
                            <li>Enter a cocktail to make a guess</li>
                            <li>After each guess, you’ll see hints comparing your guess to the secret cocktail</li>
                            <li>Use the clues to narrow down your guess</li>
                            <ul>
                                <li>Clue 1: Partial Cocktail Name (e.g. M _ _ _ _ _)</li>
                                <li>Clue 2: Cocktail Instructions</li>
                                <li>Clue 3: Cocktail Picture</li>
                            </ul>
                            <li>Your final score is determined by the time and number of guesses taken.</li>
                        </ul>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default GameInfoModal