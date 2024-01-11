import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import {
  fontSizeOptions,
}
  from 'utils/deviceControlUtils';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import FormikTextField from 'components/FormControls/TextField';
import FormikCheckbox from 'components/FormControls/Checkbox';
import RemoveButton from 'components/RemoveButton';
import Radio from 'components/Radio';

const MAX_COUNT_OF_SLIDER_OPTIONS = 102;
const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  mapperOptions: {
    display: 'flex',
  },
  indexWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  inputMapper: {
    width: '110px',
    padding: '0 10px',
    textAlign: 'start',
    color: '#6C7688',
    fontSize: '11px',
  },
  defaultColumn: {
    color: '#6C7688',
    fontSize: '11px',
    width: '60px',
  },
  mapperHeader: {
    display: 'flex',
  },
  scoreIndex: {
    padding: '10px',
  },
  addItemContainer: {
    textAlign: 'start',
  },
  checkBox: {
    marginTop: '15px',
  },
  mapperRow: {
    display: 'flex',
    padding: '10px',
  },
}));

export default ({
  values = {},
  name,
  actionProps,
}) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const onDefaultChange = (e, ind) => {
    setFieldValue(`${name}mapper`, values
      .mapper.map((value, index) => {
        if (index === ind) {
          return {
            ...value,
            default: e.target.checked,
          };
        }

        return {
          ...value,
          default: false,
        };
      }));
  };

  return (
    <div className={classes.mapperOptions}>
      <div>
        <div className={classes.mapperHeader}>
          <div className={classes.defaultColumn}>
            Default
          </div>
          <div className={classes.inputMapper}>
            Score
          </div>
          <div className={classes.inputMapper}>
            Description
          </div>
        </div>
        {values.mapper.map((item, ind) => (
          <div className={classes.mapperRow}>
            <Radio
              label=""
              onChange={(e) => onDefaultChange(e, ind)}
              checked={!!item.default}
            />
            <FormikTextField
              name={`${name}mapper[${ind}].score`}
              classes={{
                control: classes.inputMapper,
                root: classes.textField,
              }}
              withDebounce
              placeholder="Enter score"
            />
            <FormikTextField
              withDebounce
              name={`${name}mapper[${ind}].description`}
              classes={{
                control: classes.inputMapper,
                root: classes.textField,
              }}
              placeholder="Enter description"
            />
            <RemoveButton
              onClick={
                () => {
                  setFieldValue(`${name}mapper`, values.mapper
                    .filter((v, index) => (ind !== index))
                    .map((el, i) => {
                      // to reset default if removed
                      if (item.default) {
                        if (ind - 1 === i) {
                          return { ...item, default: true };
                        }
                        if (ind === 0 && i === 0) {
                          return { ...item, default: true };
                        }
                      }

                      return el;
                    }));
                }
            }
              disabled={values.mapper.length === 2}
            />
          </div>
        ))}
        <div className={classes.addItemContainer}>
          <Button
            variant="buttonTransparent"
            disableRipple
            onClick={() => {
              setFieldValue(`${name}mapper`, [...values.mapper, {
                score: '',
                description: '',
                default: false,
              }]);
            }}
            disabled={values.mapper.length >= MAX_COUNT_OF_SLIDER_OPTIONS}
          >
            + Add Score
          </Button>
        </div>
        <div className={classes.scoreIndex}>
          <FormikCheckbox
            name={`${name}showIndex`}
            label="Show numeric score above slider"
            onChange={(e) => {
              setFieldValue(`${name}showIndex`, e.target.checked);
            }}
            checked={!!values.showIndex}
          />
          {values.showIndex
        && (
        <div className={classes.indexWrapper}>
          <FormikColorPicker
            label="Score Index Color"
            value={values.scoreIndexColor}
            name={`${name}scoreIndexColor`}
            {...actionProps}
          />
          <div className={cn(classes.row, classes.withoutSpace)}>
            <div className={classes.label}>Index y-position</div>
            <FormikTextField
              name={`${name}scoreIndexPosition`}
              classes={{
                root: classes.textField,
              }}
              withDebounce
              type="number"
              placeholder="Enter score"
            />
          </div>
          <div className={cn(classes.row, classes.withoutSpace)}>
            <div className={classes.label}>Index Font-size</div>
            <FormikSelect
              options={fontSizeOptions}
              value={values.indexSize}
              name={`${name}indexSize`}
              classes={{
                select: classes.select,
              }}
              {...actionProps}
            />
          </div>
        </div>
        )}
        </div>
        <div className={classes.scoreIndex}>
          <FormikCheckbox
            name={`${name}hideScore`}
            label="Don't show Score, Description, thumb
            score index before user's interaction"
            onChange={(e) => {
              setFieldValue(`${name}hideScore`, e.target.checked);
            }}
            checked={!!values.hideScore}
          />
        </div>
      </div>
    </div>
  );
};
