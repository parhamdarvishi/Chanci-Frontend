/**
 * This file contains custom modal styles for the application
 * It provides consistent modal styling for mobile devices
 */

export const getMobileModalStyles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  return {
    fullScreen: isMobile,
    modalProps: isMobile ? { style: { position: 'absolute', bottom: 0, right: 0, left: 0 } } : undefined,
    radius: isMobile ? { top: '16px', bottom: 0 } : '30px',
    padding: isMobile ? '16px' : undefined,
    styles: isMobile ? {
      body: { padding: '16px' },
      header: { padding: '16px 16px 0 16px' },
      content: { width: '100%' }
    } : undefined
  };
};