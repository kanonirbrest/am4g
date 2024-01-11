import React, { useEffect, useRef, memo } from 'react';
import { makeStyles } from '@mui/styles';
import GridLayout from 'react-grid-layout';
import { useFormikContext } from 'formik';

import 'react-grid-layout/css/styles.css';
import { style } from 'components/GL/style';
import GridItem from 'components/GL/Components';
import { getDefaultLayoutItem } from 'utils/constants/layout';
import { COLUMNS_PER_PAGE } from 'utils/constants';
import { getStyleByType } from './utils';

const useStyles = makeStyles(() => ({
  ...style,
  innerTextClass: {
    overflow: 'hidden',
  },
  ignorePreviewClick: {
    pointerEvents: 'none !important', /* to allow drag disabled button on phone preview */
  },
  displayProp: {
    visibility: 'visible',
  },
  textareaControl: {
    pointerEvents: 'none',
    '&::placeholder': {
      color: 'var(--placeholder-color)',
      padding: 'var(--placeholder-vertical) var(--placeholder-horizontal)',
    },
  },
}));

const getKey = (f) => `${f.index}-${f.type}`;

const GLWithResize = ({
  values,
  handleLayoutUpdate,
  hovered,
  setHovered,
  page,
}) => {
  const classes = useStyles();
  const { setFieldValue, ...formik } = useFormikContext();
  const { pages } = formik.values.step2 || [];
  const pageValues = React.useMemo(() => pages, [pages.length]);
  const isDragged = useRef(false);
  const isResized = useRef(true);
  const inputRef = useRef(null);
  const checker = useRef(false);

  useEffect(() => {
    if (values.fields) {
      const items = values.fields.map((f) => {
        // const isHovered = hovered === index;

        const founded = formik.values.step2.layout
          .find((item) => (item.i === `${f.index}-${f.type}`));

        if (founded) {
          return { ...founded, isResizable: true };
        }

        return {
          ...getDefaultLayoutItem(f, f.index, page - 1),
          isResizable: true,
          page,
        };
      });

      setFieldValue('step2.layout', items);
    }
  }, [values.fields.length]);

  const saveLayout = (l, isReOrdered = false) => {
    setFieldValue('step2.layout', l);
    if (isReOrdered) {
      handleLayoutUpdate(l);
    }
  };
  const onDragStop = (l, oldItem, newItem) => {
    isDragged.current = false;
    // to avoid dropping item between pages or to next page
    if (Math.ceil((oldItem.x + oldItem.w) / COLUMNS_PER_PAGE)
      !== Math.ceil((newItem.x + newItem.w) / COLUMNS_PER_PAGE)) {
      checker.current = true;

      return false;
    }

    if (!checker.current) {
      saveLayout(l.map((item) => ({
        ...item,
      })), l.sort((a, b) => a.y - b.y).map(((o) => o.i))
        .join(',') !== formik.values.step2.layout
        .sort((a, b) => a.y - b.y).map((o) => o.i).join(','));
    }

    return true;
  };
  const onResizeStop = (l, item, newItem) => {
    // check if page not changed
    if (Math.floor(item.x / COLUMNS_PER_PAGE)
      === Math.floor((newItem.x + newItem.w - 1) / COLUMNS_PER_PAGE)) {
      saveLayout(l);
    }
    isResized.current = false;
    setHovered(null);
  };
  const onResizeStart = () => {
    isResized.current = true;
  };
  const onDragStart = () => {
    isDragged.current = true;
  };
  const onMouseOver = (index) => {
    if (!isResized.current && !isDragged.current) {
      setHovered(index);
    }
  };
  const onMouseLeave = () => {
    if (!isResized.current && !isDragged.current) {
      setHovered(null);
      checker.current = false;
    }
  };
  const items = values.fields?.map((f, index) => {
    const key = getKey(f);

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
        key={key}
        data-hovered={hovered === index}
        data-hidden={f.page !== page}
        style={getStyleByType(f.type, f, {})}
        onMouseOver={() => onMouseOver(index)}
        onMouseOut={onMouseLeave}
      >
        <GridItem
          f={f}
          inputRef={inputRef}
          fields={values.fields}
          pages={pageValues}
          itemKey={key}
          key={key}
        />
      </div>
    );
  });

  return (
    <GridLayout
      className={classes.layout}
      data-test="test"
      style={{ ...style.layout, left: `${-373 * (page - 1)}px` }}
      layout={formik.values.step2.layout}
      cols={COLUMNS_PER_PAGE * pages.length}
      id="layout"
      rowHeight={11.65}
      width={373 * pages.length}
      height={200}
      autoSize={false}
      isDraggable
      isResizable
      // useCSSTransforms={false}
      isBounded
      compactType={null}
      preventCollision
      resizeHandles={['se']}
      margin={[0, 0]}
      onDragStop={onDragStop}
      onDragStart={onDragStart}
      onResizeStop={onResizeStop}
      onResizeStart={onResizeStart}
    >
      {items}
    </GridLayout>
  );
};
export default memo(GLWithResize);
