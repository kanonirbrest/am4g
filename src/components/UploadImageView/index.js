import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

import Upload from 'components/Upload';
import { makeStyles } from '@mui/styles';
import RemoveButton from 'components/RemoveButton';
// eslint-disable-next-line max-len
import ImagePositionButtons from 'routes/Application/NewCampaign/Stepper/Step2/InApp/Custom/Tabs/HTML/ImagePositionButtons';
import FormikSelect from 'components/FormControls/Select';
import cn from 'classnames';
import { objectFitOptions } from 'utils/deviceControlUtils';
import { formatImageSize } from 'utils';
import StatusButton from 'components/StatusButton';

const useStyles = makeStyles(() => ({
  preview: {
    width: '542px',
    minHeight: '88px',
    display: 'flex',
    alignItems: 'center',
    background: '#F8FAFD',
    marginTop: '10px',
  },
  error: {
    border: '2px solid #E14B50',
  },
  errorLabel: {
    fontSize: '10px',
    color: '#E14B50',
    textAlign: 'start',
    marginTop: '5px',
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  previewImg: {
    width: '80px',
    height: '80px',
  },
  name: {
    fontSize: '14px',
    color: '#3E4554',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  nameValue: {
    minWidth: '20px',
    minHeight: '17px',
  },
  editIcon: {
    marginLeft: '10px',
    fontSize: '11px',
  },
  size: {
    fontSize: '10px',
    color: '#6C7688',
  },
  description: {
    padding: '15px',
    textAlign: 'start',
  },
  button: {
    marginRight: '20px',
    marginLeft: 'auto',
  },
  previewWrapper: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '350px',
  },
  selectControl: {
    alignItems: 'flex-start',
    marginTop: '10px',
  },
  select: {
    minWidth: '240px',
  },
  upload: {
    marginTop: '8px',
  },
}));

export default React.memo(({
  backgroundValue,
  backgroundFile,
  onAttach,
  onAttachAllLanguages,
  onRemove,
  onChangePosition,
  backgroundObjectFit,
  onFitChange,
  classes: propClasses = {},
  withBorder = true,
  actionProps = {},
  position,
  disabled,
  error,
  campaignId,
  onChangeName,
  contentEditable,
}) => {
  const classes = useStyles();

  return (
    <div>
      {!backgroundValue && (
      <>
        <Upload
          disabled={disabled}
          classes={{
            label: classes.upload,
            button: error && classes.error,
          }}
          onAttach={onAttach}
          campaignId={campaignId}
          {...actionProps}
        />
        {error && <div className={classes.errorLabel}>Required element</div>}
      </>
      )}
      {backgroundValue && (
      <>
        <div className={classes.previewWrapper}>
          <div
            className={cn(classes.preview, propClasses.preview)}
            style={{ border: withBorder ? '1px solid #D8DFE8' : 'none' }}
          >
            <div className={classes.imgContainer}>
              <img
                alt="uploaded"
                src={backgroundValue}
                className={classes.previewImg}
              />
              {onAttachAllLanguages && (
              <StatusButton
                onClick={() => onAttachAllLanguages(backgroundValue, backgroundFile)}
                label="Apply for all languages"
              />
              )}
            </div>
            <div className={classes.description}>
              <div
                className={classes.name}
                contentEditable={contentEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (onChangeName) {
                    onChangeName(e.target.innerText);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className={classes.nameValue}>{backgroundFile?.name}</span>
                {contentEditable && (
                <EditIcon
                  className={classes.editIcon}
                />
                )}
              </div>
              <div className={classes.size}>
                {formatImageSize(backgroundFile)}
              </div>
            </div>
            {onRemove && (
            <RemoveButton
              classes={{ root: classes.button }}
              onClick={onRemove}
              {...actionProps}
            />
            )}
          </div>
          {onChangePosition && (
          <ImagePositionButtons
            onSelect={onChangePosition}
            position={position}
            {...actionProps}
          />
          )}
        </div>
        {onFitChange && (
        <FormikSelect
          options={objectFitOptions}
          value={backgroundObjectFit}
          defaultValue="Original"
          onChange={onFitChange}
          classes={{
            control: classes.selectControl,
            select: classes.select,
          }}
          name="step2.backgroundObjectFit"
          {...actionProps}
        />
        )}
      </>
      )}
    </div>
  );
});
