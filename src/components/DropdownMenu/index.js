import React, {
  useState,
  useCallback,
} from 'react';
import IconButton from '@mui/material/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import MoreVert from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  itemLabel: {
    marginLeft: '10px',
    width: '58px',
    textAlign: 'left',
    fontWeight: 400,
    fontSize: '12px',
    color: '#3E4554',
  },
}));

export default ({
  items = [],
  isHorizontal = true,
}) => {
  const classes = useStyles();
  const [menuEl, setMenuEl] = useState(null);
  const isMenuOpen = Boolean(menuEl);

  const handleMenuClick = useCallback((event) => {
    setMenuEl(event.currentTarget);
  }, [setMenuEl]);

  const handleMenuClose = useCallback(() => {
    setMenuEl(null);
  }, [setMenuEl]);

  return (
    <>
      <IconButton
        size="medium"
        color="primary"
        onClick={handleMenuClick}
        ref={menuEl}
      >
        {isHorizontal ? <MoreHoriz />
          : <MoreVert htmlColor="#8D95A9" />}
      </IconButton>

      <Menu
        anchorEl={menuEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {items
          .map(({
            title, onClick,
            Icon, disabled,
          }, index) => (
            <MenuItem
             /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              onClick={(e) => {
                onClick(e);
                handleMenuClose();
              }}
              disabled={disabled}
            >
              {Icon && <Icon />}
              <span className={classes.itemLabel}>{title}</span>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
