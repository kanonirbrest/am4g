import { createTheme } from '@mui/material/styles';

export default createTheme({
  typography: {
    fontFamily: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans - serif'].join(','),
  },
  palette: {
    primary: {
      main: '#4675C0',
    },
    background: {
      default: '#ffffff',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: '#D8DFE8',
          '&:hover:not(.Mui-error) fieldset': {
            borderColor: '#D8DFE8 !important',
          },
        },
        multiline: {
          padding: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filterChip: {
          margin: '4px',
          background: '#B2BED1',
          color: '#fff !important',
          borderRadius: '4px',
          height: '24px',
          '&:hover, &:focus': {
            background: '#8AA2C7',
          },
        },
        includeChip: {
          margin: '4px',
          background: '#8AA2C7',
          color: '#fff !important',
          borderRadius: '4px',
          height: '24px',
          '&:hover': {
            background: '#7D95BC',
          },
          '&:pressed': {
            background: '#59719C',
          },
          deleteIcon: {
            width: '14px',
            color: 'white !important',
          },
        },
        excludeChip: {
          margin: '4px',
          background: '#E14B50',
          color: '#fff !important',
          borderRadius: '4px',
          height: '24px',
          '&:hover': {
            background: '#BC3D43',
          },
          '&:pressed': {
            background: '#93383D',
          },
          deleteIcon: {
            width: '14px',
            color: 'white !important',
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          marginLeft: '20px',
        },
        line: {
          borderLeftStyle: 'dotted',
          borderColor: '#B2BED1',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          color: 'white',
          backgroundColor: '#22BB9F',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        buttonLanguage: {
          background: '#F8FAFD',
          border: '1px solid #D8DFE8',
          borderRadius: '4px',
          color: '#3E4554',
          fontSize: '12px',
          textTransform: 'capitalize',
          fontWeight: '500',
          '&:hover, &:focus': {
            background: '#8D95A9',
            border: '1px solid #B2BED1',
            color: '#FFFFFF',
          },
          '&:active, &:pressed': {
            background: '#8D95A9',
            color: '#FFFFFF',
            border: 'none',
          },
        },
        buttonAdd: {
          background: '#F8FAFD',
          border: '1px solid #D8DFE8',
          borderRadius: '4px',
          color: '#4675C0',
          fontSize: '12px',
          textTransform: 'capitalize',
          fontWeight: '500',
          '&:hover, &:focus': {
            backgroundColor: '#F8FAFD',
            border: '1px solid #B2BED1',
            color: '#2B5EB0',
          },
          '&:active, &:pressed': {
            backgroundColor: '#D8DFE8',
            color: '#16448F',
            border: 'none',
          },
        },
        buttonBlue: {
          backgroundColor: '#4675C0',
          background: '#4675C0',
          height: '36px',
          minWidth: '118px',
          boxShadow: '0px 2px 4px rgba(22, 68, 143, 0.25)',
          borderRadius: '4px',
          padding: '0 20px',
          color: 'white',
          textTransform: 'none',
          '&:hover, &:focus': {
            backgroundColor: '#2B5EB0',
            boxShadow: '0px 4px 8px rgba(22, 68, 143, 0.4)',
          },
          '&:active, &:pressed': {
            backgroundColor: '#16448F',
            boxShadow: 'none',
          },
          '&:disabled': {
            background: '#B2BED1',
            boxShadow: 'none',
            color: 'white',
          },
        },
        buttonWhite: {
          backgroundColor: 'white',
          color: '#6C7688',
          height: '36px',
          minWidth: '118px',
          boxShadow: '0px 2px 4px rgba(62, 69, 84, 0.25)',
          borderRadius: '4px',
          padding: '0 20px',
          '&:hover, &:focus': {
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(62, 69, 84, 0.3)',
          },
          '&:active, &:pressed': {
            boxShadow: 'none',
            backgroundColor: ' #F8FAFD',
            border: '1px solid #D8DFE8',
          },
          '&:disabled': {
            background: '#B2BED1',
            boxShadow: 'none',
            color: 'white',
          },
        },
        buttonGrey: {
          backgroundColor: 'white',
          color: '#6C7688',
          height: '36px',
          minWidth: '118px',
          boxShadow: '0px 2px 4px rgba(62, 69, 84, 0.25)',
          borderRadius: '4px',
          padding: '0 20px',
          '&:hover, &:focus': {
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(62, 69, 84, 0.3)',
          },
          '&:active, &:pressed': {
            boxShadow: 'none',
            backgroundColor: ' #F8FAFD',
            border: '1px solid #D8DFE8',
          },
          '&:disabled': {
            background: '#B2BED1',
            boxShadow: 'none',
            color: 'white',
          },
        },
        buttonTransparent: {
          color: '#4675C0',
          textTransform: 'none',
          fontSize: '12px',
          backgroundColor: 'transparent',
          height: '36px',
          minWidth: '88px',
          borderRadius: '4px',
          padding: '0 10px',
          '&:hover, &:focus': {
            color: '#2B5EB0',
            backgroundColor: 'transparent',
          },
          '&:active, &:pressed': {
            color: '#16448F',
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
          '&:disabled': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: '#B2BED1',
          },
          '&:disabled svg': {
            opacity: '.5',
          },
        },
        buttonDarkBlue: {
          color: 'white',
          textTransform: 'none',
          fontSize: '12px',
          backgroundColor: '#8AA2C7',
          height: '36px',
          minWidth: '88px',
          borderRadius: '4px',
          padding: '0 10px',
          '&:hover, &:focus': {
            color: 'white',
            backgroundColor: '#7D95BC',
          },
          '&:active, &:pressed': {
            color: 'white',
            boxShadow: 'none',
            backgroundColor: '#59719C',
          },
          '&:disabled': {
            backgroundColor: '#B2BED1',
            boxShadow: 'none',
            color: 'white',
          },
          '&:disabled svg': {
            opacity: '.5',
          },
        },
      },
    },
  },
});
