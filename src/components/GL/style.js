const item = {
  position: 'absolute',
  width: '9px !important',
  height: '9px !important',
  background: '#8D95A9',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.4)',
  borderRadius: '50%',
  cursor: 'resize',

  '&:after': {
    display: 'none',
  },
};

export const style = {
  layout: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  visible: {
    display: 'flex',
    flexDirection: 'column',
  },
  unVisible: {
    display: 'none',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  innerText: {
    width: '100%',
    verticalAlign: 'middle',
    color: 'inherit',
    textAlign: 'inherit',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
  },
  hovered: {
    border: '1px solid #D8DFE8',
    zIndex: 100,
  },
  hidden: {
    visibility: 'hidden !important',
  },
  resetBtn: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  active: {
    border: '1px solid #D8DFE8',
  },
  button: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  left: {
    left: '-5px',
    bottom: '-5px',
    cursor: 'nw-resize',
    ...item,
  },
  right: {
    right: '-5px',
    bottom: '-5px',
    cursor: 'se-resize',
    ...item,
  },
  topLeft: {
    left: '-5px',
    top: '-5px',
    cursor: 'sw-resize',
    ...item,
  },
  topRight: {
    right: '-5px',
    top: '-5px',
    cursor: 'ne-resize',
    ...item,
  },
  action: {
    fontSize: '20px',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  ASTitle: {
    fontSize: '16px',
    color: '#6C7688',
    fontWeight: 'bold',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    flexDirection: 'column',
  },
  ASTitleMessage: {
    fontSize: '14px',
    color: '#6C7688',
    fontWeight: 'normal',
    marginTop: '4px',
  },
  cancel: {
    fontSize: '20px',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: '#FAFAFA',
  },
  ignorePreviewClick: {
    pointerEvents: 'none !important', /* to allow drag disabled button on phone preview */
  },
};

const hoverItem = {
  position: 'absolute',
  width: '9px',
  height: '9px',
  background: '#8D95A9',
  border: '1px solid #FFFFFF',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.4)',
  borderRadius: '50%',
};

export const hoverStyle = {
  left: {
    left: '-5px',
    bottom: '-5px',
    ...hoverItem,
  },
  right: {
    right: '-5px',
    bottom: '-5px',
    ...hoverItem,
  },
  topLeft: {
    left: '-5px',
    top: '-5px',
    ...hoverItem,
  },
  topRight: {
    right: '-5px',
    top: '-5px',
    ...hoverItem,
  },
  button: {
    position: 'absolute',
    left: '-13px',
    zIndex: 1,
    background: '#F1F5FA',
    border: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.4)',
    padding: '6px',
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#F1F5FA',
    },
    '&:active': {
      backgroundColor: '#F1F5FA',
    },
    '&:focus': {
      backgroundColor: '#F1F5FA',
    },
  },
};
export const lastStyles = {
  borderRadius: '13px',
  borderBottom: 'none',
};
export const preLastStyles = {
  borderBottomLeftRadius: '13px',
  borderBottomRightRadius: '13px',
};
export const firstStyles = {
  borderTopLeftRadius: '13px',
  borderTopRightRadius: '13px',
};
