import React, { useMemo } from 'react';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { campaignType } from 'components/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    background: 'transparent',
  },
  chip: {
    margin: theme.spacing(0.5),
    background: '#B2BED1',
    color: '#fff !important',
    borderRadius: '4px',
  },
  icon: {
    color: '#fff !important',
    height: '12px',
    width: '12px',
  },
}));
/* hide this filters because we should not show sub filters for push in chips list */
const hiddenSubTypeFilter = [
  campaignType.pushTriggeredCancelTrail, campaignType.pushTriggeredCancelPaid,
];

const getFilterItems = ({
  filters, onDelete, classes, getLabel,
}) => Object.keys(filters)
  .filter((f) => !hiddenSubTypeFilter.includes(f)).map((f) => {
    if (filters[f]) {
      return (
        <div key={f}>
          <Chip
            variant="filterChip"
            label={getLabel ? getLabel(f) : f}
            onDelete={onDelete(f)}
            className={classes.chip}
            deleteIcon={<CloseIcon classes={{ root: classes.icon }} />}
          />
        </div>
      );
    }

    return null;
  }).filter(Boolean);

export default function FilterList({
  filters,
  setFilters,
  getLabel,
}) {
  const classes = useStyles();
  const handleDelete = (chipToDelete) => () => {
    setFilters((currentValue) => {
      const values = { ...currentValue };
      values[chipToDelete] = false;

      return values;
    });
  };

  const memoizedFilterItems = useMemo(() => getFilterItems({
    filters,
    onDelete: handleDelete,
    classes,
    getLabel,
  }), [filters]);

  return (
    memoizedFilterItems
  );
}
