import * as Yup from 'yup';
import { DATE_TYPE_ERROR } from 'utils/validation/constant';

/* pass if null or >1 */
/* not pass if undefined or '' or 0 */
export const numberValidation = Yup.mixed()
  .test('is value undefined',
    'should be number',
    (value) => value !== undefined)
  .test('valid number, or default value',
    'Should be more than >= 1',
    (value) => value === null || Number(value) >= 1);

export const stringValidation = Yup.mixed()
  .test('is value or null',
    'Required field',
    (value) => !!value || value === null);

export const dateValidation = Yup.date()
  .required('Required field').typeError(DATE_TYPE_ERROR);

export const numberMoreThanOne = Yup.number()
  .typeError('must be a number')
  .min(1, 'Should be more than >= 1')
  .required('Required field');
