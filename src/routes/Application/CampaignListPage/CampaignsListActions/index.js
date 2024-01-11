import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
  useHistory,
} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';

import Select from 'components/FormControls/Select/select';
import StatusChecked from 'assets/icons/StatusChecked';
import StatusDefault from 'assets/icons/StatusDefault';
import { SORT_TYPE } from 'utils/sortUtils';
import { BUTTON_TYPES } from 'utils/styles/common';

const useStyles = makeStyles(() => ({
  formControlLabel: {
    top: '-8px',
    fontSize: '12px',
  },
  checkBoxLabel: {
    fontSize: '12px',
    color: '#3E4554',
  },
  actions: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  newCampaign: {
    marginRight: '8px',
  },
  selectControl: {
    marginRight: '25px',
    marginBottom: 0,
    minWidth: '220px',
  },
}));

const options = [{
  value: SORT_TYPE.UPDATED,
  label: 'Sort by Edit Date',
}, {
  value: SORT_TYPE.NAME,
  label: 'Sort by Name',
}, {
  value: SORT_TYPE.STATUS,
  label: 'Sort by Status',
}];

export default ({
  sort,
  setSort,
  groupBy,
  setGroupBy,
  activeApplication,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (event) => {
    const { value } = event.target;

    setSort(value);
  };
  const handleGroupByChange = (event) => {
    setGroupBy(event.target.checked);
  };
  const onNewCampaignClick = () => {
    history.push(`${activeApplication.id}/new-campaign`);
  };

  return (
    <div className={classes.actions}>
      <FormControlLabel
        classes={{ label: classes.checkBoxLabel }}
        control={(
          <Checkbox
            checked={!!groupBy}
            onChange={handleGroupByChange}
            checkedIcon={<StatusChecked />}
            icon={<StatusDefault />}
            name="groupBy"
            color="primary"
          />
        )}
        label="Group by Campaign type"
      />
      <Select
        options={options}
        placeholder="Sort by"
        onChange={handleChange}
        value={sort}
        classes={{
          control: classes.selectControl,
        }}
      />
      <Button
        className={classes.newCampaign}
        variant={BUTTON_TYPES.BLUE}
        color="primary"
        size="medium"
        text="button"
        startIcon={
          <AddIcon />
        }
        onClick={onNewCampaignClick}
      >
        New campaign
      </Button>
    </div>
  );
};
