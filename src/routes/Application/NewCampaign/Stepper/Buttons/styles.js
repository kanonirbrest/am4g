import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  buttonsWrapper: {
    display: 'flex',
    marginBottom: '20px',
    marginTop: '15px',
    width: '100%',
  },
  save: {
    background: 'white',
    marginLeft: 'auto',
    color: '#6C7688',
    textTransform: 'none',
  },
  test: {
    background: 'white',
    color: '#6C7688',
    marginLeft: '10px',
  },
  back: {
    marginRight: '10px',
    textTransform: 'none',
  },
  form: {
    display: 'flex',
    flexGrow: 1,
  },
  icon: {
    marginRight: '10px',
  },
  saveAndRun: {
    marginLeft: '10px',
  },
}));
