import React from 'react';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';

import Filters from './filters';

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: '20px',
  },
}));

export default ({
  setFilterValues,
  filterValues,
  subTypeFilters,
  setSubTypeFilters,
  authors,
  setAuthorFilter,
  filterAuthor,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Formik
        initialValues={{ ...filterValues, ...subTypeFilters, ...filterAuthor }}
        onSubmit={(values) => {
          const {
            active, stopped, archived, draft,
            ...subFields
          } = values;
          setFilterValues({
            active, stopped, archived, draft,
          });

          const selectedSubType = {};
          const selectedAuthor = {};
          Object.keys(subFields).forEach((key) => {
            if (authors.includes(key)) {
              selectedAuthor[key] = subFields[key];
            } else {
              selectedSubType[key] = subFields[key];
            }
          });

          setSubTypeFilters(selectedSubType);
          setAuthorFilter(selectedAuthor);
        }}
      >
        <Filters
          filterValues={filterValues}
          subTypeFilters={subTypeFilters}
          authors={authors}
          filterAuthor={filterAuthor}
          {...props}
        />
      </Formik>
    </div>
  );
};
