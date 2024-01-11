import React from 'react';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import FormikSelect from 'components/FormControls/Select';
import FormikDateTimePicker from 'components/FormControls/FormikDateTimePicker';
import FormikDatePicker from 'components/FormControls/FormikDatePicker';
import { SHOW_END_DATE } from 'utils/constants/triggering';
import Hint from 'components/Hint';
import { getEndDate, getDateWithNullSeconds } from 'utils/sendCampaign/triggering/inApp';
import styles from '../styles';

export const BEGINNING_OPTIONS = [{
  label: 'on the date',
  value: SHOW_END_DATE.YES,
}, {
  label: 'never',
  value: SHOW_END_DATE.NO,
}];

const useStyles = makeStyles(() => ({
  ...styles,
  pickerWrapper: {
    margin: '0 10px',
  },
}));
const HINT_DATE_FORMAT = 'MMMM DD, YYYY [at] h:mm a';
const HINT_SIZE = '20px';

const getHintText = (beginning, end) => {
  let startText = '';
  let endText = '';
  if (beginning) {
    const date = getDateWithNullSeconds(beginning, HINT_DATE_FORMAT);

    if (date !== 'Invalid Date') {
      startText = `beginning ${
        date
      } (Local Timezones) ${end ? ',' : ''}`;
    }
  }

  if (end) {
    const date = getEndDate(end, beginning, HINT_DATE_FORMAT);

    if (date !== 'Invalid Date') {
      endText = `ending ${
        date
      } (Local Timezones)`;
    }
  }

  return (
    <div>
      <div>
        Optional. Leave it empty if you want to run the campaign immediately
      </div>
      <div>{(beginning || end) && <b>Show Campaign:</b>}</div>
      {startText && <div>{startText}</div>}
      {endText && <div>{endText}</div>}
    </div>
  );
};

export default ({
  name,
  dateStart,
  dateEnd,
  isShowEndDate,
}) => {
  const formik = useFormikContext() ?? {};
  const classes = useStyles();

  const hint = React.useMemo(() => getHintText(
    dateStart, dateEnd,
  ), [dateStart, dateEnd]);

  return (
    <div
      className={classes.inputWrapper}
    >
      <div className={classes.inputLabel}>
        Beginning
      </div>
      <FormikDateTimePicker
        value={dateStart}
        name={`${name}dateStart`}
        classes={{ wrapper: classes.pickerWrapper }}
      />
      <div className={classes.inputLabel}>and ending</div>
      <FormikSelect
        options={BEGINNING_OPTIONS}
        value={isShowEndDate}
        name={`${name}isShowEndDate`}
        onChange={(e) => {
          formik.setFieldValue(`${name}isShowEndDate`, e.target.value);
          if (e.target.value === SHOW_END_DATE.NO) {
            formik.setFieldValue(`${name}dateEnd`, null).then(() => {
              formik.validateForm();
            });
          }
        }}
        placeholder="Select"
        classes={{ control: classes.selectControl }}
      />
      <FormikDatePicker
        value={dateEnd}
        name={`${name}dateEnd`}
        disabled={isShowEndDate !== SHOW_END_DATE.YES}
        required
      />
      <Hint
        width={HINT_SIZE}
        height={HINT_SIZE}
        text={hint}
        boxWidth="380px"
      />
    </div>
  );
};
