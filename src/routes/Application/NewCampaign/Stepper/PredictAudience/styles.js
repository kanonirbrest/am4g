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
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '15px',
    background: '#F8FAFD',
    border: '1px solid #D8DFE8',
    position: 'relative',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    marginBottom: '30px',
  },
}));

export default useStyles;
