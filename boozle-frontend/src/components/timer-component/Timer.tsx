import React from "react";
import './Timer.css';

interface TimerProps {
    gameComplete: boolean
}

const Timer: React.FC<TimerProps> = ({gameComplete}) => {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    const startTime = React.useRef<Date | null>(null);
    const intervalRef = React.useRef<number | null>(null)

    React.useEffect(() => {
        startTime.current = new Date();
        intervalRef.current = window.setInterval(() => {
            if (startTime.current) {
                const now = new Date();
                const diff = Math.floor((now.getTime() - startTime.current.getTime()) / 1000);
                setMinutes(Math.floor(diff / 60));
                setSeconds(diff % 60);
            }
        }, 1000);

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }
    }, []);

    React.useEffect(() => {
        if (gameComplete && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [gameComplete])

    return (
        <div className="timer">
            <span>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</span>
        </div>
    );
}

export default Timer;