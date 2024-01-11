import React from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import FieldContainer from 'routes/Application/NewCampaign/Stepper/Step3/FieldContainer';
import { targetingFilters, additionalTargetingFilters } from 'utils/targetingConfig';
import { FILTER_TYPE } from 'utils/targetingConfig/utils';
import { copyObject } from 'utils';

const MULTI_FIELDS_OR_LIMIT = 5;

const useStyles = makeStyles(() => ({
  select: {
    minWidth: '100px',
  },
  selectControl: {
    marginRight: '15px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  label: {
    marginRight: '15px',
    fontSize: '14px',
  },
  orButton: {
    textTransform: 'uppercase',
    background: '#8AA2C7',
    marginLeft: 'auto',
    color: 'white',
    height: '28px',
    width: '62px',
    fontSize: '12px',
    marginRight: '15px',
  },
  textField: {
    width: '120px',
  },
  floated: {
    marginBottom: '0!important',
  },
}));

const WithOrField = ({
  name,
  items,
  component: Component,
  filters,
  filter,
  field: filterKey,
  platform,
  andIndex,
  ...props
}) => {
  const classes = useStyles();
  const config = filterKey === FILTER_TYPE.FILTERS ? targetingFilters
    : additionalTargetingFilters;
  const { values, setFieldValue, validateForm } = useFormikContext();

  const addOrField = () => {
    const defaultValue = config[filter].defaultValues(platform);

    if (config[filter].isMulti) {
      // array if filters, example hasEvent: [and[or],[or]], [and]
      const filterList = [..._get(values, `${name}[${andIndex}]`)];
      filterList.push(defaultValue[0]);
      setFieldValue(`${name}[${andIndex}]`, filterList);
    } else {
      // array if filters, example single: [or,or]
      const filterList = [..._get(values, `${name}`)];
      filterList.push(defaultValue);
      setFieldValue(`${name}`, filterList);
    }
  };
  const onRemove = (and, or, filterName) => {
    const step3 = copyObject(values.step3);

    if (!config[filterName].withOr && !config[filterName].isMulti) {
      // single field => remove filter
      delete step3[filterName];
      step3[filterKey] = filters.filter((f) => f !== filter);
    } else if (step3[filterName][and].length === 1) {
      // last or filter
      if (step3[filterName].length === 1) {
        // last and filter && last or
        step3[filterKey] = filters.filter((f) => f !== filter);
        // remove whole filter
        delete step3[filterName];
      } else {
        // not last and, but last or, remove and filter
        step3[filterName] = step3[filterName].filter((f, index) => index !== and);
      }
    } else if (config[filterName].withOr) {
      // not last or filter
      step3[filterName][and] = step3[filterName][and]
        .filter((f, index) => index !== or);
    } else {
      step3[filterName] = step3[filterName].filter((f, index) => index !== and);
    }

    setFieldValue('step3', step3)
      .then(() => {
        validateForm();
      });
  };

  if (config[filter]?.isMulti) {
    if (config[filter]?.withOr) {
      // render by and && or index [and[or, or], and[or, or]]
      return (
        <>
          {items[andIndex].map((item, orIndex) => (
            <FieldContainer
              /* eslint-disable-next-line react/no-array-index-key */
              key={name + andIndex + orIndex}
              onRemove={() => { onRemove(andIndex, orIndex, filter); }}
              classes={orIndex < (items[andIndex].length - 1)
                    && { container: classes.floated }}
              index={orIndex}
              isLast={items[andIndex].length - 1 === orIndex}
            >
              <div className={classes.wrapper}>
                <Component
                  fieldName={`${name}[${andIndex}][${orIndex}].`}
                  andIndex={andIndex/* remove if not need? */}
                  orIndex={orIndex/* remove if not need? */}
                  item={items[andIndex][orIndex]}
                  {...props}
                />
                {config[filter].withOr && (orIndex === items[andIndex].length - 1
                    && items[andIndex].length < MULTI_FIELDS_OR_LIMIT) && (
                    <Button
                      color="primary"
                      onClick={addOrField}
                      variant="contained"
                      classes={{ root: classes.orButton }}
                    >
                      + Or
                    </Button>
                )}
              </div>
            </FieldContainer>
          ))}
        </>
      );
    }

    // render field by and index
    return (
      <FieldContainer
        key={name}
        onRemove={() => { onRemove(andIndex, 0, filter); }}
        isLast
      >
        <div className={classes.wrapper}>
          <Component
            fieldName={`${name}[${andIndex}].`}
            item={items[andIndex]}
            andIndex={andIndex}
            {...props}
          />
        </div>
      </FieldContainer>
    );
  }

  // render without and index but probably with or
  return (
    <>
      {items.map((item, ind) => (
        <FieldContainer
          /* eslint-disable-next-line react/no-array-index-key */
          key={name}
          onRemove={() => { onRemove(ind, 0, filter); }}
          classes={ind < (items.length - 1)
                    && { container: classes.floated }}
          index={ind}
          isLast={items.length - 1 === ind}
        >
          <div className={classes.wrapper}>
            <Component
              ind={ind}
              item={item}
              fieldName={`${name}[${ind}].`}
              {...props}
            />
            {config[filter].withOr && (ind === items.length - 1) && (
            <Button
              color="primary"
              onClick={addOrField}
              variant="contained"
              classes={{ root: classes.orButton }}
            >
              + Or
            </Button>
            )}
          </div>
        </FieldContainer>
      ))}
    </>
  );
};

export default WithOrField;
