import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@mui/styles';

import OfferStateContext from 'contexts/OfferState';
import useEditor from 'hooks/useEditor';
import RemoveButton from 'components/RemoveButton';
import Editor, { updateBackground } from 'components/Editor';
import deviceControlStyles from 'utils/styles/deviceControlStyles';
import Switch from '@mui/material/Switch';
import { removeOfferForAllLanguages, updOfferForAllLanguages } from 'utils/languageUtils';
import { copyObject } from 'utils';
import Hint from 'components/Hint';
import ChipSelect from 'components/FormControls/ChipSelect';
import { useField, useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  ...deviceControlStyles,
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #D8DFE8',
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

const EditorView = ({
  values = {},
  name,
  actionProps,
  forceEditorUpdate,
  index: activeFieldIndex,
  platform,
  editorIndex,
  text,
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
    offerOptions,
  } = React.useContext(OfferStateContext);
  const {
    editorRef, updateInitialEditorStyles,
  } = useEditor({
    values,
    products: formikValues.step2.products,
    forceEditorUpdate,
    editorText: value,
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
  const onSelectOffers = (offers) => {
    const langs = updOfferForAllLanguages(formikValues.step2.languages, activeFieldIndex, editorIndex, offers);
    setFieldValue('step2.languages', langs);
  };
  const onRemoveOffers = () => {
    const langs = removeOfferForAllLanguages(formikValues.step2.languages, activeFieldIndex, editorIndex);
    setFieldValue('step2.languages', langs);
  };
  const handleChange = (event) => {
    updateBackground(editorRef, event.target.checked);
    changeBackground(event.target.checked);
  };

  return (
    <div className={cn(classes.container, !!error && classes.editorError)}>
      <div className={classes.variantRow}>
        {editorIndex !== 0 && (
          <>
            <div className={classes.textLabel}>
              Text
              {' '}
              {editorIndex}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={classes.selectOffer}>
                <div className={classes.conditionsLabel}>
                  Display conditions:
                  {' '}
                  <Hint text="Select here offer(s). If user is eligible to the conditions,
                he will see the content you add here. If not, he will see a base text. "
                  />
                </div>
                <ChipSelect
                  onSelect={onSelectOffers}
                  values={values.text[editorIndex].offers}
                  options={offerOptions}
                  title="Add offer"
                />
              </div>

              <RemoveButton
                onClick={onRemoveOffers}
              />
            </div>
          </>
        )}
      </div>

      {loading && '...loading'}
      <Editor
        editorRef={editorRef}
        value={text}
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
        darkBackground={values.darkBackground}
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
      <div className={classes.switcher}>
        <Switch
          checked={values.darkBackground}
          onChange={handleChange}
          size="small"
        />
        {' '}
        Show text on dark background
      </div>
    </div>
  );
};

export default EditorView;
