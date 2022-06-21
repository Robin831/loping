import { useEffect, useState } from "react";

export const useResponsiveHandler = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1080);
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < 1080));
    }, [])

    return {
        isMobile
    }
}