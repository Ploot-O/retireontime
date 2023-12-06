import { useEffect, useState } from 'react';

export function LightDarkButton() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        document.body.className = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    return (
        <>
            <button type='button' className='button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={toggleTheme}>Toggle Light/Dark Theme</button>
        </>
    );
}