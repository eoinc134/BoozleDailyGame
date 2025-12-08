import type React from "react";
import "./ClueCard.css"
import type { Cocktail } from "../../models/cocktail";
import { Image } from "@mui/icons-material";

type ClueCardProps = {
    dailyCocktail: Cocktail,
    hintsUsed: number, 
    gameComplete: boolean
}

const ClueCard: React.FC<ClueCardProps> = ({dailyCocktail, hintsUsed, gameComplete}) => {
    function getInstructions(): string[] {
        if(gameComplete || hintsUsed >= 2) {
            return dailyCocktail.instructions.split('.').slice(0, -1)
        }
        return [""]
        
    }

    function getCocktailName(): string {
        if(gameComplete) {
            return dailyCocktail.name
        } 
        
        let result = ''
        let newWord = true

        for (const char of dailyCocktail.name) {
            if(/[a-zA-Z]/.test(char)) {
                if(newWord) {
                    result += "\n";
                    result += char;
                    newWord = false
                } else {
                    result += "_ "
                }
            } else {
                result += char;
                newWord = true
            }
        }

        return result
    }

    return (
        <>
        {(hintsUsed > 0 || gameComplete) && (
            <div className="clue-card-container">
                <div className="image-container" >
                    {hintsUsed >= 3 || gameComplete ? (
                        <img src={dailyCocktail.imageUrl} width="150" height="150" style={{borderRadius: '1rem'}}></img>
                    ) : (
                        <Image style={{width: 150, height: 150}}/>
                    )}
                </div>
                <div className="body-container">
                    <div className="cocktail-name-container">
                        <h3 style={{ color: "#242121", textAlign: "left" }}>{getCocktailName()}</h3>
                    </div>
                    <div className="instructions-container">
                        <ul>
                            {getInstructions().map((instruction, index) => (
                                <li style={{ color: "#242121", textAlign: "left" }} key={index}>{`${instruction}`}</li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
        </>
        
    )
}

export default ClueCard