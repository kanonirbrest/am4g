import React from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import { androidFontFamilyOptions, iosFontFamilyOptions } from 'utils/deviceControlUtils';
import { DEVICE_CONTROL, PLATFORM } from 'utils/constants';

import Title from './Title';
import Text from './Text';
import Button from './Button';
import Slider from './Slider';
import Feedback from './Feedback';
import Radio from './Radio';
import Image from './Image';
import WithAccordion from './WithAccordion';
import LayoutDialog from './Radio/LayoutDialog';

const getComponentByType = (type, props) => {
  switch (type) {
    case DEVICE_CONTROL.TITLE:

      return <Title {...props} />;
    case DEVICE_CONTROL.TEXT:

      return <Text {...props} />;
    case DEVICE_CONTROL.BUTTON:

      return <Button {...props} />;
    case DEVICE_CONTROL.IMAGE:

      return <Image {...props} />;

    case DEVICE_CONTROL.NPS_SLIDER:

      return <Slider {...props} />;

    case DEVICE_CONTROL.FEEDBACK:

      return <Feedback {...props} />;

    case DEVICE_CONTROL.RADIO:

      return <Radio {...props} />;

    default:
      return null;
  }
};
const DeviceControls = ({
  tabValue, hovered, setHovered,
  platform: platformValue,
  submitted,
  page,
  pages,
  forceEditorUpdate,
}) => {
  const formik = useFormikContext() ?? {};
  const [layoutFieldIndex, setLayoutFieldIndex] = React.useState(false);

  const fontFamilyOptions = platformValue === PLATFORM.ANDROID
    ? androidFontFamilyOptions : iosFontFamilyOptions;

  return (
    <div id="device-controls">
      {_get(formik, `values.step2.languages[${tabValue}].fields`, [])
        .map((field, index) => {
          const {
            type, index: controlIndex, label, page: fieldPage,
          } = field;
          const onFocus = () => {
            setHovered(index);
          };
          const onBlur = () => {
            setHovered(null);
          };
          const props = {
            fields: formik.values.step2.languages[tabValue].fields,
            values: field,
            name: `step2.languages[${tabValue}].fields[${index}].`,
            index,
            actionProps: {
              onFocus, onBlur,
            },
            fontFamilyOptions,
            activeLanguage: tabValue,
            platform: platformValue,
            pages,
            forceEditorUpdate,
            submitted,
            onRemoveImage: () => {
              // TODO refactor
              formik
                .setFieldValue(
                  `step2.languages[${tabValue}].fields[${index}]`,
                  {
                    ...field,
                    backgroundValue: undefined,
                    backgroundFile: undefined,
                  },
                );
            },
          };

          if (type.includes('nps-') && type !== DEVICE_CONTROL.NPS_SLIDER) {
            // show only one accordion for nps button score and description
            return '';
          }
          if (fieldPage !== page) {
            return null;
          }

          return (
            <WithAccordion
              key={`${type}_${controlIndex}`}
              activeLanguage={tabValue}
              hovered={hovered}
              setHovered={setHovered}
              index={index}
              controlIndex={controlIndex}
              label={label || type}
              type={type}
              onOpenLayout={setLayoutFieldIndex}
              actions={field.actions}
            >
              {getComponentByType(type, props)}
            </WithAccordion>
          );
        })}
      {layoutFieldIndex !== false && (
      <LayoutDialog
        name={`step2.languages[${tabValue}].fields[${layoutFieldIndex}].`}
        open={layoutFieldIndex}
        fieldIndex={layoutFieldIndex}
        setOpen={setLayoutFieldIndex}
        values={formik.values.step2.languages[tabValue].fields[layoutFieldIndex]}
      />
      )}
    </div>
  );
};
export default DeviceControls;
