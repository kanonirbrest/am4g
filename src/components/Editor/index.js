import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import _debounce from 'lodash.debounce';

import {
  ALLOWED_OBJECT_COMMANDS,
  NON_EDITABLE_CLASS, getEditorConfig, BACKGROUND,
} from './constant';

export const updateBackground = (editorRef, checked) => {
  if (checked) {
    // eslint-disable-next-line no-param-reassign
    editorRef.current.getBody().style.background = BACKGROUND.DARK;
  } else {
    // eslint-disable-next-line no-param-reassign
    editorRef.current.getBody().style.background = BACKGROUND.LIGHT;
  }
};

export default ({
  value,
  onChange,
  editorRef,
  updateInitialEditorStyles,
  darkBackground,
  changeBackground,
  platform,
  onInit,
  error,
  ...props
}) => {
  // to fix slow editor update
  const debouncedBlurHandler = _debounce((content) => {
    onChange(content);
  }, 250);

  const initialValue = useRef(value);

  const config = React.useMemo(
    () => getEditorConfig(platform), [],
  );

  React.useEffect(() => {
    if (editorRef?.current) {
      updateBackground(editorRef, darkBackground);
    }
  }, [darkBackground]);

  return (
    <>
      <Editor
        onBlur={(e) => {
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        onFocus={(e) => {
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
        onEditorChange={debouncedBlurHandler}
        onBeforeExecCommand={(e) => {
          if (ALLOWED_OBJECT_COMMANDS.indexOf(e.command) !== -1) {
            editorRef.current.getBody()
              .querySelectorAll(NON_EDITABLE_CLASS)
              .forEach((el) => {
                el.setAttribute('contenteditable', true);
                el.setAttribute('suppressContentEditableWarning', true);
                if (e.command === 'RemoveFormat') {
                  // because we should make elements editable, change prop and then make non-editable again
                  setTimeout(() => {
                    el.classList.add('mceNonEditable');
                    el.setAttribute('contenteditable', false);
                  }, 0);
                }
              });
          }
        }}
        onInit={(
          evt, editor,
        ) => {
          if (onInit) {
            onInit();
          }
          // eslint-disable-next-line
          editorRef.current = editor;
          updateInitialEditorStyles();
          updateBackground(editorRef, darkBackground);
        }}
        initialValue={initialValue.current}
        onClick={() => {
          editorRef.current.getBody()
            .querySelectorAll(NON_EDITABLE_CLASS)
            .forEach((el) => {
              el.setAttribute('contenteditable', false);
            });
        }}
        suppressContentEditableWarning
        apiKey="pu76mhlx5b4nl7ei5g0j02cqydfzmat67ud2ik4omvy0e9f3"
        init={config}
        content_css="https://am.platforms.team/static/html/fonts/fonts.css"
        content_css_cors={false}
      />
    </>
  );
};
