import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import _get from 'lodash.get';

import UploadImageView from 'components/UploadImageView';
import FormikSelect from 'components/FormControls/Select';
import Select from 'components/FormControls/Select/select';
import ImageFit from 'components/ImageFit';
import { cutRoundOptions } from 'utils/deviceControlUtils';
import { ImageActionOptions } from 'utils/constants/campaign';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { BUTTON_TYPES } from 'utils/styles/common';
import { copyObject } from 'utils';
import { onAddActionToAllLanguages } from 'utils/languageUtils';
import { getFilteredActions } from 'utils/actionUtils';
import { useFormikContext } from 'formik';
import Actions from './Actions';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  preview: {
    justifyContent: 'flex-start !important',
    minWidth: '200px',
    width: 'auto !important',
    marginRight: '15px',
  },
  addAction: {
    marginTop: '10px',
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
    width: '100%',
  },
  removeBtn: {
    marginTop: '15px',
  },
  select: {
    minWidth: '240px',
  },
  cutRoundSelect: {
    minWidth: '80px',
  },
  input: {
    width: '100%',
  },
}));
export default ({
  values = {},
  name,
  actionProps = {},
  index: activeFieldIndex,
  onRemoveImage,
  submitted,
  pages,
}) => {
  const {
    errors, setFieldValue, values: formikValues,
  } = useFormikContext() ?? {};
  const classes = useStyles();
  const onAddActions = () => {
    setFieldValue(`${name}actions`, []);
  };

  const imageError = submitted && _get(errors, `${name}backgroundValue`);
  const onAttachAllLanguages = (src, file) => {
    const languages = formikValues.step2.languages.map((l) => {
      const copiedLanguage = copyObject(l);
      copiedLanguage.fields[activeFieldIndex].backgroundValue = src;
      copiedLanguage.fields[activeFieldIndex].backgroundFile = file;

      return copiedLanguage;
    });
    setFieldValue('step2.languages', languages);
  };
  const onAttach = (src, file) => {
    setFieldValue(
      `${name}backgroundValue`,
      src,
    );
    setFieldValue(`${name}backgroundFile`, file);
  }; // TODO: add cache using ref?
  const onChangeImageName = (value) => {
    setFieldValue(`${name}backgroundFile.name`, value);
  };
  const onAddAction = (e) => {
    const languages = onAddActionToAllLanguages(
      e.target.value, _get(formikValues, 'step2.languages'),
      activeFieldIndex, ImageActionOptions,
    );
    setFieldValue('step2.languages', languages);
  };

  return (
    <div className={classes.wrapper}>
      <UploadImageView
        withBorder={false}
        campaignId={formikValues.id}
        backgroundValue={values.backgroundValue}
        backgroundFile={values.backgroundFile}
        contentEditable
        onAttachAllLanguages={onAttachAllLanguages}
        onAttach={onAttach}
        onChangeName={onChangeImageName}
        classes={{ preview: classes.preview }}
        onRemove={onRemoveImage}
        error={imageError}
        {...actionProps}
      />
      {values.backgroundValue && (
      <>
        <div className={classes.row}>
          <div className={classes.label}>Cut Round</div>
          <FormikSelect
            options={cutRoundOptions}
            value={values.cutRound}
            name={`${name}cutRound`}
            classes={{
              select: classes.cutRoundSelect,
            }}
            {...actionProps}
          />
        </div>
        <ImageFit
          value={values.imageFit}
          name={`${name}imageFit`}
          actionProps={actionProps}
        />
        {!values.actions && (
        <div className={classes.block}>
          <Button
            variant={BUTTON_TYPES.TRANSPARENT}
            disableRipple
            onClick={onAddActions}
            classes={{ root: classes.addAction }}
            {...actionProps}
          >
            + Add action result
          </Button>
        </div>
        )}
        {values.actions
          && (
          <>
            <div className={classes.block}>
              <div>
                <div className={classes.label}>Action Result</div>
                <Select
                  options={getFilteredActions(ImageActionOptions, values.actions)}
                  placeholder={!values?.actions?.length ? 'Select action'
                    : `${values.actions.length} actions selected`}
                  onChange={onAddAction}
                  value=""
                  classes={{
                    select: classes.actionResultSelect,
                  }}
                  {...actionProps}
                />
              </div>
            </div>
            <Actions
              actions={values.actions}
              actionOptions={ImageActionOptions}
              name={name}
              pages={pages}
              fieldIndex={activeFieldIndex}
            />
          </>
          )}
      </>
      )}
    </div>
  );
};
