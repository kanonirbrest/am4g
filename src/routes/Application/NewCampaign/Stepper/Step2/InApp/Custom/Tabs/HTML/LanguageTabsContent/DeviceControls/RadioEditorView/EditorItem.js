import React, { useEffect } from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';

import useEditor from 'hooks/useEditor';
import Editor from 'components/Editor';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { copyObject } from 'utils';
import { useField, useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    padding: '10px 0',
  },
  variantRow: {
    fontSize: '14px',
  },
  editorError: {
    '& .tox-editor-container': {
      border: '1px solid red',
    },
  },
  switcher: {
    color: '#6C7688',
    marginLeft: 'auto',
    fontSize: '12px',
    marginTop: '5px',
  },
  textLabel: {
    color: '#6C7688',
    fontSize: '14px',
    textAlign: 'start',
  },
  conditionsLabel: {
    fontSize: '11px',
    color: '#6C7688',
  },
  selectOffer: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}));

export default ({
  values = {},
  name,
  actionProps,
  index: activeFieldIndex,
  platform,
  forceEditorUpdate,
  mode,
  darkBackground,
  withBorder = true,
  buttonIndex,
}) => {
  const { values: formikValues, setFieldValue } = useFormikContext() ?? {};
  const [{
    value, onBlur,
  }, { error }, {
    setValue,
  }] = useField(name);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const {
    editorRef, updateInitialEditorStyles, updateProductMenu,
  } = useEditor({
    values,
    products: formikValues.step2.products,
    forceEditorUpdate,
    editorText: value,
    selectedProduct: values.buttonList[buttonIndex]?.actionValue?.product,
  });
  const changeBackground = (v) => {
    const languages = formikValues.step2
      .languages.map((l) => {
        const fields = copyObject(l.fields);
        fields[activeFieldIndex].darkBackground = v;

        return {
          ...l,
          fields,
        };
      });
    setFieldValue('step2.languages', languages);
  };
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.mode.set(mode);
    }
  }, [mode]);

  useEffect(() => {
    if (editorRef.current) {
      updateProductMenu(); // TODO remove
    }
  }, [values.buttonList[buttonIndex]?.actionValue?.product]);

  return (
    <div
      className={cn(classes.container, !!error && classes.editorError)}
      style={withBorder ? { borderBottom: '1px solid #D8DFE8' } : { padding: 0 }/* TODO refactor */}
    >
      {loading && '...loading'}
      <Editor
        editorRef={editorRef}
        value={value}
        onInit={() => {
          setLoading(false);
        }}
        error={error}
        platform={platform}
        onChange={(html) => {
          setValue(html);
        }}
        changeBackground={changeBackground}
        updateInitialEditorStyles={updateInitialEditorStyles}
        darkBackground={darkBackground}
        onBlur={(e) => {
          onBlur(e);
          if (actionProps?.onBlur) {
            actionProps.onBlur(e);
          }
        }}
        onFocus={(e) => {
          if (actionProps?.onFocus) {
            actionProps.onFocus(e);
          }
        }}
      />
    </div>
  );
};
