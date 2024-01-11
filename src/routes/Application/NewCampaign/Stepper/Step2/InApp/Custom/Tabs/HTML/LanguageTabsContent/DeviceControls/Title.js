import React from 'react';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';

import Editor from 'components/Editor';
import useEditor from 'hooks/useEditor';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
}));
export default ({
  values = {},
  name,
  actionProps,
  forceEditorUpdate,
  platform,
  index: activeFieldIndex,
}) => {
  const classes = useStyles();
  const formik = useFormikContext() ?? {};
  const {
    editorRef, updateInitialEditorStyles,
  } = useEditor({
    values,
    products: formik.values.step2.products,
    forceEditorUpdate,
    editorText: values.text,
  });
  const changeBackground = (v) => {
    const languages = formik.values.step2
      .languages.map((l) => {
        const { fields } = l;
        fields[activeFieldIndex].darkBackground = v;

        return {
          ...l,
          fields,
        };
      });
    formik.setFieldValue('step2.languages', languages);
  };

  return (
    <div>
      <div className={cn(classes.row, classes.editorMargin)}>
        <div className={classes.label}>Text</div>
        <Editor
          editorRef={editorRef}
          value={values.text}
          platform={platform}
          onChange={(html) => {
            formik.setFieldValue(`${name}text`, html);
          }}
          changeBackground={changeBackground}
          updateInitialEditorStyles={updateInitialEditorStyles}
          darkBackground={values.darkBackground}
          {...actionProps}
        />
      </div>
    </div>
  );
};
