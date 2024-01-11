export const styles = {
  footerWrapper: {
    flex: 1,
  },
  totalColumn: {
    maxHeight: '40px',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    color: '#3E4554',
  },
  totalRow: {
    display: 'flex',
    flex: 1,
    textAlign: 'left',
    justifyContent: 'start',
    padding: '0 10px 0 15px',
    fontWeight: 500,
    color: '#3E4554',
    fontSize: '14px',
  },
  pagination: {
    padding: '10px',
  },
};

export const proStyles = {
  footerWrapper: {
    ...styles.footerWrapper,
    width: '100%',
    flexDirection: 'column',
  },
  totalColumn: {
    ...styles.totalColumn,
    width: '100%',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    pointerEvents: 'none',
  },
  totalRowPro: {
    textAlign: 'left',
    padding: '0 10px 0 15px',
    fontWeight: 500,
    color: '#3E4554',
    fontSize: '14px',
  },
  pagination: {
    ...styles.pagination,
    justifyContent: 'flex-start',
    display: 'flex',
  },
};
