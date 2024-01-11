import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { makeStyles } from '@mui/styles';

import { ReactComponent as Check } from 'assets/icons/Check.svg';
import DefaultLogo from 'components/Default';
import Down from 'assets/icons/Down';

const useStyles = makeStyles(() => ({
  listItemSelected: {
    backgroundColor: '#F8FAFD !important',
    border: 'thin solid #D8DFE8',
    borderRadius: '14px',
  },
  listItem: {
    padding: '6px !important',
    margin: '3px 10px',
    width: 'calc(100% - 20px)',
  },
  image: {
    height: '48px',
    width: '48px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
  },
  platform: {
    color: '#8D95A9',
    fontSize: '10px',
  },
  name: {
    fontWeight: '700',
    fontSize: '14px',
  },
  icon: {
    marginLeft: 'auto',
  },
  rotatedIcon: {
    marginLeft: 'auto',
    transform: 'rotate(180deg)',
  },
  avatar: {
    height: '48px',
    width: '48px',
    borderRadius: '8px',
  },
}));

const ApplicationListItem = ({
  item, onSelectApplication, isActive, isDropDown = false,
  isRotated = false,
}) => {
  const classes = useStyles();
  const { name, image, platform } = item;

  return (
    <ListItem
      button
      key={name}
      onClick={(e) => {
        onSelectApplication(e, item);
      }}
      classes={{
        selected: classes.listItemSelected,
        root: classes.listItem,
      }}
      selected={isActive}
    >
      <ListItemIcon>
        {image ? <img src={image} className={classes.avatar} alt="" />
          : <DefaultLogo />}
      </ListItemIcon>
      <div className={classes.container}>
        <div>
          <div
            className={classes.name}
            style={{
              color: isActive && '#4675C0',
            }}
          >
            {name}
          </div>
          <div className={classes.platform}>{platform}</div>
        </div>
        {isActive && <Check />}
        {isDropDown && (
        <Down
          className={isRotated
            ? classes.rotatedIcon : classes.icon}
        />
        )}
      </div>
    </ListItem>
  );
};

export default ApplicationListItem;
