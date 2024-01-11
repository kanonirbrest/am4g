import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export const getItemKey = (key, id) => `${key}.${id}`;
export default ({ onClose, selectedValue, open }) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>There are no changes to restore</DialogTitle>
    </Dialog>
  );
};
