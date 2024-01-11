import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    background: '#F8FAFD',
    borderRadius: '8px 8px 0px 0px',
    borderBottom: '1px solid #D8DFE8',
    textTransform: 'uppercase',
  },
  dialog: {
    width: '1224px',
    maxWidth: '1224px',
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    overflowY: 'auto',
  },
  left: {
    display: 'flex',
    flex: 1,
    padding: '20px 30px',
    flexDirection: 'column',
  },
  right: {
    padding: '20px',
    height: '400px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  submitButton: {
    fontSize: '12px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '15px',
    background: '#F8FAFD',
    border: '1px solid #D8DFE8',
    position: 'relative',
  },
  ids: {
    marginBottom: '30px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    marginBottom: '30px',
  },
  messageContainer: {
    marginTop: '40px',
  },
  messageImg: {
    height: '20px !important',
    width: 'auto !important',
    marginRight: '6px',
    borderRadius: '4px',
  },
  errorBlock: { // in utils
    color: '#E14B50',
    fontSize: '10px',
  },
  device: {
    height: '750px !important',
  },
  icon: {
    marginRight: '5px',
  },
  deepLink: {
    marginBottom: '20px',
    fontSize: '12px',
    fontWeight: 'normal',
    color: '#6C7688',
  },
  deepLinkLabel: {
    marginBottom: '5px',
  },
}));

export default useStyles;
