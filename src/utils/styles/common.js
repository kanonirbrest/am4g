export const languageAccordionStyles = {
  root: {
    background: '#F8FAFD',
    border: '1px solid #D8DFE8',
    marginBottom: '10px',
    boxShadow: 'none',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10px',
    fontSize: '16px',
  },
  summaryRoot: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    textTransform: 'capitalize',
  },
  detailsRoot: {
    borderTop: '1px solid #D8DFE8',
  },
  active: {
    border: '1px solid rgb(70, 117, 192)',
  },
};

export const BUTTON_TYPES = {
  ADD: 'buttonAdd',
  LANGUAGE: 'buttonLanguage',
  BLUE: 'buttonBlue',
  WHITE: 'buttonWhite',
  GREY: 'buttonGrey',
  TRANSPARENT: 'buttonTransparent',
  DARK_BLUE: 'buttonDarkBlue',
};
