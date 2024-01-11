import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  pageWrapper: {
    display: 'flex',
    flex: 1,
    background: '#F1F5FA',
    flexDirection: 'column',
    zIndex: 0,
  },
  separator: {
    '& svg': {
      fontSize: '15px',
    },
    '& path': {
      fill: 'black',
    },
  },
  breadCrumbs: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  header: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  main: {
    display: 'flex',
    padding: '0 20px 20px 20px',
    flexGrow: 1,
  },
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  /* tabs */
  tabPanel: {
    boxShadow: '0px 0px 4px rgba(62, 69, 84, 0.3)',
    border: '1px solid #D8DFE8',
    borderTop: 'none',
    background: 'white',
  },
  /* end tabs */
  chartWrapper: {
    marginTop: '20px',
    height: '366px',
  },
  table: {
    width: '100%',
  },
  dataGrid: {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  purchaseLabel: {
    marginTop: '20px',
    marginBottom: '10px',
    textAlign: 'start',
    color: '#6C7688',
    display: 'flex',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: '10px',
  },
  columnHeader: {
    background: '#D8DFE8',
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: '12px',
    color: '#3E4554',
    '&:focus, &:focus-within': {
      outline: 'none !important',
    },
    height: '40px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxWidth: 'calc(100% - 270px)',
  },
  exportWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px 0',
  },
  cell: {
    fontSize: '14px',
    color: '#3E4554',
    paddingLeft: '15px!important',
    '&:focus, &:focus-within': {
      outline: 'none !important',
    },
  },
  selectedRowCount: {
    display: 'none',
  },
  date: {
    fontSize: ' 10px',
    color: '#3E4554',
  },
  row: {
    '&:nth-child(even)': {
      background: '#F8FAFD',
    },
  },
  variantLabel: {
    fontWeight: ' bold',
  },
}));

export default useStyles;
