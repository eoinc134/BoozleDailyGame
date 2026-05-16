import { useEffect, useState } from "react";

function getTimeUntilMidnight(): string {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useCountdown(): string {
    const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 1000);
        return () => clearInterval(interval);
    }, []);

    return timeLeft;
}
