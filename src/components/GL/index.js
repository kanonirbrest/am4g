/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import GridLayout from 'react-grid-layout';
import _get from 'lodash.get';

import 'react-grid-layout/css/styles.css';
import { getMaxIndex, insert } from 'utils/arrayUtils';
import { style } from 'components/GL/style';
import getGridItem from 'components/GL/fields';
import { getDefaultLayoutItem } from 'utils/constants/layout';

const useStyles = makeStyles(() => style);
const GLProps = {
  isDraggable: false,
  isResizable: false,
  resizeHandles: [],
};
const maxYPosition = 680;

export default function GL({
  values,
  formik,
  innerLayout,
}) {
  const classes = useStyles();
  const [layout, setLayout] = useState(innerLayout || []);
  const onDuplicate = (index) => {
    const languages = _get(formik.values, 'step2.languages');
    const item = values.fields[index];
    const copiedItem = { ...item, index: getMaxIndex(values.fields) + 1 };
    languages.forEach((l, ind) => {
      const fields = [...(l.fields || [])];

      formik.setFieldValue(
        `step2.languages[${ind}].fields`,
        insert(fields, item.index, copiedItem),
      );
    });
  };
  useEffect(() => {
    if (values.fields) {
      const items = values.fields.map((f, index) => {
        const founded = layout.find((item) => (item.i === `${f.index}-${f.type}`));
        const h = maxYPosition - (((values.fields.length - index - 1) * 60));
        const offset = f.type === 'cancel' ? 1 : 0;

        if (founded) {
          return {
            ...founded,
            i: `${index}-${f.type}`,
            y: h + 1,
          };
        }

        return {
          ...getDefaultLayoutItem({
            ...f,
            index,
          },
          index),
          y: h + offset,
        };
      });

      setLayout(items);
    }
  }, [values.fields.length]);

  return (
    <GridLayout
      className={classes.layout}
      layout={layout}
      cols={100}
      rowHeight={1}
      width={360}
      height={200}
      autoSize={false}
      isBounded={false}
      compactType={null}
      margin={[8, 0]}
      {...GLProps}
    >
      {values.fields?.map((f, index) => getGridItem({
        f: { ...f, index },
        classes,
        index,
        onDuplicate,
        isPreLast: values.fields?.length - 2 === index,
        isFirst: index === 0,
      }))}
    </GridLayout>
  );
}
