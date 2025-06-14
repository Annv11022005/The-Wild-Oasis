import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import PropTypes from 'prop-types';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node,
};

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) throw new Error('Lỗi');

  return context;
}

export { DarkModeProvider, useDarkMode };
