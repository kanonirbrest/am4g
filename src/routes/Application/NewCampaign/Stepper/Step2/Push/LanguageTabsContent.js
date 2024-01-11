import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikTextField from 'components/FormControls/TextField';
import UploadImageView from 'components/UploadImageView';
import FormikCheckbox from 'components/FormControls/Checkbox';
import { PLATFORM } from 'utils/constants';
import deviceControlStyles from 'utils/styles/deviceControlStyles';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  inputContainer: {
    minWidth: '495px',
  },
  row: {
    marginTop: '10px',
  },
  preview: {
    marginTop: '10px',
  },
}));

const LanguageTabsContent = ({
  platform: platformValue,
  language,
  activeVariant,
}) => {
  const classes = useStyles();
  const { setFieldValue, ...formik } = useFormikContext();

  const values = formik.values.step2.languages[language][activeVariant].content;
  const name = `step2.languages.${language}.${activeVariant}.content.`;

  const onAttach = (src, file) => {
    setFieldValue(
      `${name}imgValue`,
      src,
    );
    setFieldValue(`${name}image`, file);
  };
  const onRemove = () => {
    setFieldValue(`${name}image`, null);
    setFieldValue(`${name}imgValue`, null);
  };
  const onBigPictureChange = (e) => {
    setFieldValue(`${name}isBigPicture`, e.target.checked);
  };
  const showIsBigPicture = (values.imgValue || values.image)
      && platformValue !== PLATFORM.IOS;

  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.label}>Title</div>
        <FormikTextField
          name={`${name}title`}
          classes={{
            control: classes.inputContainer,
            root: classes.textField,
          }}
          placeholder="Enter title"
          withDebounce
        />
      </div>
      {platformValue === PLATFORM.IOS && (
      <div className={classes.row}>
        <div className={classes.label}>Sub Title</div>
        <FormikTextField
          name={`${name}subtitle`}
          multiline
          classes={{
            control: classes.inputContainer,
            root: classes.textField,
          }}
          placeholder="Enter subtitle"
          withDebounce
        />
      </div>
      )}
      <div className={classes.row}>
        <div className={classes.label}>Message</div>
        <FormikTextField
          name={`${name}body`}
          multiline
          classes={{
            control: classes.inputContainer,
            root: classes.textField,
          }}
          placeholder="Enter message"
          withDebounce
        />
      </div>
      <div className={classes.preview}>
        <UploadImageView
          withBorder={false}
          backgroundValue={values.imgValue || values?.image?.link}
          backgroundFile={values.image}
          campaignId={values.id}
          onAttach={onAttach}
          onRemove={onRemove}
        />
        {showIsBigPicture
        && (
        <div className={classes.row}>
          <FormikCheckbox
            name={`${name}isBigPicture`}
            label="Big Picture"
            checked={values.isBigPicture}
            onChange={onBigPictureChange}
          />
        </div>
        )}
      </div>
    </div>
  );
};
export default LanguageTabsContent;
