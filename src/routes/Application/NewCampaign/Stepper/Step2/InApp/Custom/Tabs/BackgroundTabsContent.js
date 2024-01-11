import React from 'react';

import FormikColorPicker from 'components/FormControls/FormikColorPicker';
import UploadImageView from 'components/UploadImageView';

export const BACKGROUND_TYPE = {
  IMAGE: 'image',
  COLOR: 'color',
};

export const BackgroundTabsContent = ({
  tabValue,
  backgroundColor,
  onChange,
  classes,
  ...props
}) => {
  switch (tabValue) {
    case BACKGROUND_TYPE.IMAGE:

      return (
        <UploadImageView {...props} />
      );
    case BACKGROUND_TYPE.COLOR:

      return (
        <FormikColorPicker
          defaultValue="#fff"
          value={backgroundColor}
          name="step2.backgroundColor"
          classes={{ wrapper: classes.pickerWrapper }}
        />
      );
    default:
      return null;
  }
};
