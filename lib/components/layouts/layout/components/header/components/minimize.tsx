import { Maximize, Minimize as MinimizeIcon } from 'lucide-react';
import { useState } from 'react';

export default function Minimize() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    return (
        <button className="text-slate-600 dark:text-slate-200 hover:text-slate-400 dark:hover:text-slate-400 hidden sm:block" onClick={toggleFullscreen}>
            {
                isFullscreen ? (
                    <MinimizeIcon size={24} />
                ) : (
                    <Maximize size={24} />
                )
            }
        </button>
    )
}
