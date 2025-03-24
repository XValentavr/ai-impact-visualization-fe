import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      [key: string]: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      [key: string]: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.3px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.3px',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.2px',
      fontWeight: 400,
    },
    h1: {
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: 500,
      letterSpacing: '0.2px',
    },
    h2: {
      fontSize: '34px',
      lineHeight: '44px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 600,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '20px',
    },
    button: {
      fontSize: '14px',
      lineHeight: '26px',
      letterSpacing: '0.25px',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#F16300',
      dark: '#FE8836',
    },
    background: {
      default: '#ffffff',
      paper: '#F7F7F7',
    },
    text: {
      primary: '#000000',
      secondary: '#4C545B',
    },
    custom: {
      textDarkBlue: '#1F2932',
      subTitleModal: '#1C3C6C',
    },
    error: {
      main: '#D32F2F',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export const theme = createTheme(themeOptions);
