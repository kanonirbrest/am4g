import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Image } from '@mui/icons-material';
import cn from 'classnames';
import { BUTTON_TYPES } from 'utils/styles/common';
import ApplicationContext from 'contexts/Application';

export const IMPORT_ACCEPTED_INPUT_TYPES = 'image/*';
const INPUT_ID = 'file_upload';

const useStyles = makeStyles(() => ({
  button: {
    fontSize: '12px',
  },
  label: {
    display: 'flex',
    width: '151px',
  },
}));
const getUrl = (url, campaignId) => (campaignId ? `${url}/${campaignId}` : url);
export default ({
  disabled = false,
  onAttach,
  classes: propClasses,
  actionProps,
  campaignId,
}) => {
  const classes = useStyles();
  const inputFileRef = useRef();
  const applic = React.useContext(ApplicationContext);
  const onChangeInput = () => {
    const formData = new FormData();
    const imageData = inputFileRef.current.files[0];
    formData.append('file', imageData);
    const token = localStorage.getItem('token');

    const options = {
      method: 'POST',
      body: formData,
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
    const baseUrl = process.env.REACT_APP_API_END_POINT.split('/admin')[0];
    fetch(
      getUrl(
        `${baseUrl}/admin/file/upload/${applic.bundleId}`,
        campaignId,
      ),
      options,
    )
      .then((response) => {
        if (response.status === 200) return response.text();
        throw new Error();
      })
      .then((res) => {
        onAttach(JSON.parse(res).url, {
          name: imageData.name,
          size: imageData.size,
          type: imageData.type,
        });
        // TODO: handle error
      }, () => {});
  };

  return (
    <label
      htmlFor={INPUT_ID}
      className={cn(classes.label, propClasses.label)}
      aria-label="upload image"
      data-disabled={disabled}
    >
      <Button
        variant={BUTTON_TYPES.BLUE}
        size="medium"
        classes={{ root: cn(classes.button, propClasses.button) }}
        startIcon={<Image />}
        disabled={disabled}
        onClick={() => {
          inputFileRef.current.click();
        }}
        {...actionProps}
      >
        Upload image
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={onChangeInput}
        style={{ display: 'none' }}
        id={INPUT_ID}
        name="file_upload"
        accept={IMPORT_ACCEPTED_INPUT_TYPES}
        disabled={disabled}
      />
    </label>
  );
};
