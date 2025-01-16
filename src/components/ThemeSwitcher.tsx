import {useTheme} from '../context/ThemeContext';

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 transition duration-500 ease-in-out bg-gray-200 dark:bg-gray-700 rounded-full"
        >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
}
