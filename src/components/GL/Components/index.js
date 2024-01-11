import React from 'react';

import { DEVICE_CONTROL } from 'utils/constants';
import Title from './Title';
import Text from './Text';
import Button from './Button';
import Feedback from './Feedback';
import Image from './Image';
import Radio from './Radio';
import NPSScore from './NPSScore';
import NPSDescription from './NPSDescription';
import NPSSlider from './NPSSlider';
import NPSButton from './NPSButton';

const GridItem = ({
  f,
  inputRef,
  fields,
  pages,
  itemKey,
}) => {
  switch (f.type) {
    case DEVICE_CONTROL.TITLE: {
      return (
        <Title
          f={f}
          itemKey={itemKey}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.BUTTON: {
      return (
        <Button
          f={f}
          pages={pages}
          itemKey={itemKey}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.RADIO: {
      return (
        <Radio
          f={f}
          pages={pages}
          itemKey={itemKey}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.TEXT: {
      return (
        <Text
          itemKey={itemKey}
          f={f}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.FEEDBACK: {
      return (
        <Feedback
          itemKey={itemKey}
          f={f}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.IMAGE: {
      return (
        <Image
          itemKey={itemKey}
          f={f}
          pages={pages}
        />
      );
    }
    case DEVICE_CONTROL.NPS_SCORE: {
      return (
        <NPSScore
          itemKey={itemKey}
          f={f}
          fields={fields}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.NPS_DESCRIPTION: {
      return (
        <NPSDescription
          itemKey={itemKey}
          f={f}
          fields={fields}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.NPS_SLIDER: {
      return (
        // eslint-disable-next-line react/jsx-pascal-case
        <NPSSlider
          itemKey={itemKey}
          f={f}
          inputRef={inputRef}
          key={itemKey}
        />
      );
    }
    case DEVICE_CONTROL.NPS_BUTTON: {
      return (
        // eslint-disable-next-line react/jsx-pascal-case
        <NPSButton
          itemKey={itemKey}
          f={f}
          pages={pages}
          key={itemKey}
        />
      );
    }
    default:
      return <div />;
  }
};

export default GridItem;
