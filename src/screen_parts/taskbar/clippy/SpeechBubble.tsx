
import React from 'react';
import styles from './Clippy.module.css';

interface SpeechBubbleProps {
  children: React.ReactNode; // Content to be displayed inside the bubble
  className?: string; // Optional additional class names from parent, will be appended
  style?: React.CSSProperties; // Optional inline styles (e.g., for custom CSS variables)
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ children, className, style }) => {
  // Combine the CSS module class with any additional classes passed via props
  // styles.speechBubble will refer to the .speech-bubble class in your Clippy.module.css
  // Make sure your Clippy.module.css has a class named 'speech-bubble' (or adjust here)
  const bubbleClasses = `${styles['speech-bubble'] || ''} ${className || ''}`.trim();

  return (
    // The main div uses the class from the CSS module.
    <div className={bubbleClasses} style={style}>
      {children}
    </div>
  );
};

export default SpeechBubble;
