const styles = {
  item: {
    border: '1px solid #D8DFE8',
    height: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '12px',
    color: '#3E4554',
    width: '141px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  itemWrapper: {
    position: 'relative',
  },
  editItem: {
    padding: '5px',
  },
  active: {
    background: '#8D95A9',
    color: '#fff',
    '& svg': {
      fill: 'white !important',
    },
  },
  input: {
    background: 'white',
    height: '40px',
    width: '120px',
    fontSize: '12px',
  },
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '115px',
  },
  error: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
    position: 'absolute',
    top: '-15px',
    width: '200px',
    left: '0px',
  },
};

export default styles;
