
// Team DNM Campaign System theme configuration
export const DNM_THEME = {
  colors: {
    black: "#000000",     // Header, text
    yellow: "#FFCE00",    // Accents, highlights (from Uganda flag)
    red: "#D90000",       // Critical alerts, important actions (from Uganda flag)
    green: "#306030",     // Primary brand color (from poster background)
    lightYellow: "#FFF5D6", // Background elements
    cream: "#FEF7CD",     // Soft cream color
    warmCream: "#FDE1D3", // Warm cream/peach
    white: "#FFFFFF",     // Text on dark backgrounds
    gray: "#6C757D",      // Secondary text
    lightGray: "#E9ECEF"  // Dividers, borders
  }
};

export const TYPOGRAPHY = {
  headings: {
    fontFamily: "'Montserrat', sans-serif", // Bold, confident
    weights: [600, 700]
  },
  body: {
    fontFamily: "'Open Sans', sans-serif",  // Clear, readable
    weights: [400, 500]
  },
  slogan: {
    fontFamily: "'Ubuntu', sans-serif",     // For campaign slogan
    weights: [700]
  }
};

export const DESIGN_PATTERNS = {
  borderRadius: '0.5rem',
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 15px rgba(0,0,0,0.1)'
  },
  spacing: {
    base: '1rem',
    container: '2rem',
    section: '3rem'
  },
  borders: {
    thin: '1px solid',
    accent: '3px solid'
  }
};
