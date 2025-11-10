import React from "react";
import './Timer.css';

const Timer: React.FC = () => {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    const startTime = React.useRef<Date | null>(null);

    React.useEffect(() => {
        startTime.current = new Date();
        const interval = setInterval(() => {
            if (startTime.current) {
                const now = new Date();
                const diff = Math.floor((now.getTime() - startTime.current.getTime()) / 1000);
                setMinutes(Math.floor(diff / 60));
                setSeconds(diff % 60);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            <span>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</span>
        </div>
    );
}

export default Timer;