import React from 'react';

import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import DownloadMenu from 'routes/Application/CampaignListPage/Pagination/DownloadMenu';
import Select from 'components/FormControls/Select/select';

const options = [6, 10, 20, 50, 100].map((opt) => ({
  label: opt,
  value: opt,
}));
const useStyles = makeStyles(() => ({
  iconWrapper: {
    marginLeft: '10px',
  },
  pagination: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paginationLabel: {
    display: 'inline-block',
    marginRight: '10px',
    fontWeight: '500',
    fontSize: '12px',
  },
  itemsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  selectControl: {
    marginBottom: '0',
  },
}));

export default ({
  onPageChange, count,
  itemsPerPage,
  setItemsPerPage,
  setActivePage,
  activePage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.pagination}>
      <DownloadMenu />

      {count > 1 && (
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={onPageChange}
        page={activePage + 1}
      />
      )}

      <div className={classes.itemsWrapper}>
        <p className={classes.paginationLabel}>Per page</p>
        <Select
          options={options}
          value={itemsPerPage}
          onChange={(e) => {
            setActivePage(0);
            setItemsPerPage(e.target.value);
          }}
          classes={{ control: classes.selectControl }}
        />
      </div>
    </div>
  );
};
