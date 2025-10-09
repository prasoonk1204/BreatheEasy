import React from 'react';
import { useTheme } from '../hooks/useTheme';
import LightModeBackground from './LightModeBackground';
import DarkModeBackground from './DarkModeBackground';
import BubbleEffect from './BubbleEffect';

const BackgroundManager = () => {
  const { theme } = useTheme();
  
  return (
    <>
      {theme === 'dark' ? <DarkModeBackground /> : <LightModeBackground />}
      <BubbleEffect isDark={theme === 'dark'} count={12} />
    </>
  );
};

export default BackgroundManager;