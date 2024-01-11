import * as React from 'react';

const styles = {
  preview: {
    display: 'flex',
    padding: '15px 16px',
    gap: '8px',
    flexShrink: 0,
    borderRadius: '15px',
    background: '#FFF',
    boxSizing: 'border-box',
  },
  main: {
    // display: 'flex',
    // flexDirection: 'column',
    // flexBasis: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    // gridTemplateRows: 'repeat(2, 1fr)',
    width: '100%',
  },
  item: {
    display: 'flex',
    flexGrow: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
};
const onClickString = `
     this.parentNode.parentNode.parentNode.querySelectorAll(\`div.checked\`).forEach((el) => {
        el.classList.remove("checked");
     });
     this.classList.add("checked");
     this.querySelector(\`input\`)
        .dispatchEvent(new CustomEvent('click'));
     this.querySelector(\`input\`).checked = true;
 `;

export default ({
  values, isSelected, title, subTitle, details, subDetails,
  itemValues, productId, offerIds, offerId,
}) => (
  <div
    class={isSelected ? 'checked' : ''}
    role="button"
    tabIndex={0}
    data-onclick={onClickString}
    style={{
      ...styles.preview,
      border: `${itemValues.borderThickness}px solid ${itemValues.borderColor}`,
      background: itemValues.backgroundColor,
      borderRadius: `${values.cornerRadius}px`,
      [values.radioHeight === 'fixed' ? 'height' : 'minHeight']: `${values.height}px`,
      width: `${values.width}px`,
      alignItems: 'stretch',
      overflow: 'hidden',
      ...(itemValues.showShadow && { boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)' }),
    }}
  >
    {values.showIcon && (
    <div style={{
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <input
        type="radio"
        id="radio"
        name="radio"
        onChange={() => {}}
        checked={!!isSelected}
        data-currentpage={values.page}
        data-productid={productId}
        data-offerid={offerId}
        data-offerids={JSON.stringify(offerIds)}
        style={{
          width: `${values.iconSize}px`,
          height: `${values.iconSize}px`,
          accentColor: itemValues.iconColor,
          border: `1px solid ${itemValues.iconColor}`,
          stroke: 'red',
          borderRadius: '50%',
          ...(!isSelected && { WebkitAppearance: 'none' }),
        }}
      />
    </div>
    )}
    <div style={{ ...styles.main }}>
      {/* <div */}
      {/*  style={{ */}
      {/*    display: 'flex', */}
      {/*    flexGrow: 1, */}
      {/*    color: '#667080', */}
      {/*    fontSize: '18px', */}
      {/*    letterSpacing: '-0.3px', */}
      {/*  }} */}
      {/* > */}
      {title.showField && (
        <div
          class="radioTextContainer"
          style={{ ...styles.item, textAlign: 'left' }}
          dangerouslySetInnerHTML={{ __html: title.text }}// eslint-disable-line
        />
      )}
      {details.showField && (
        <div
          class="radioTextContainer"
          style={{ ...styles.item, textAlign: 'right' }}
          dangerouslySetInnerHTML={{ __html: details.text }}// eslint-disable-line
        />
      )}
      {/* </div> */}
      {/* <div */}
      {/*  style={{ */}
      {/*    display: 'flex', */}
      {/*    flexGrow: 1, */}
      {/*    color: '#667080', */}
      {/*    fontSize: '14px', */}
      {/*    fontWeight: 400, */}
      {/*    letterSpacing: '-0.3px', */}
      {/*  }} */}
      {/* > */}
      {subTitle.showField && (
        <div
          style={{ ...styles.item, textAlign: 'left' }}
          class="radioTextContainer"
          dangerouslySetInnerHTML={{ __html: subTitle.text }}// eslint-disable-line
        />
      )}
      {subDetails.showField && (
        <div
          style={{ ...styles.item, textAlign: 'right' }}
          class="radioTextContainer"
          dangerouslySetInnerHTML={{ __html: subDetails.text }}// eslint-disable-line
        />
      )}
      {/* </div> */}
    </div>
  </div>
);
