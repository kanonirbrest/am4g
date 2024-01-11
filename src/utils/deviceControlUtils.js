import IMAGE_OBJ_FIT from 'utils/constants/image';

export const fontSizeOptions = [
  '10', '12', '14', '16', '18', '20', '24', '30', '36', '48',
].map((f) => ({ value: f, label: f }));

export const iosFontFamilyOptions = [
  'Arial',
  'Helvetica',
  'Helvetica Neue',
  'Verdana',
  'Trebuchet MS',
  'American Typewriter',
  'Apple SD Gothic Neo',
  'Courier New',
  'Courier',
  'Georgia',
  'Times New Roman']
  .map((f) => ({ value: f, label: f }));

export const androidFontFamilyOptions = ['Ubuntu',
  'Manrope',
  'Inter',
  'Open Sans',
  'Montserrat',
  'Roboto',
  'Rubik',
  'Vollkorn',
  'Bellota',
  'Lora'].map((f) => ({ value: f, label: f }));

export const cutRoundOptions = [
  '0', '2', '4', '8', '12', '16', '24', '32',
].map((f) => ({ value: f, label: f }));

export const actionResultOptions = [
  'URL', 'Deep link', 'Make a purchase', 'Close the screen',
  'Custom ID', 'Restore',
].map((f) => ({ value: f, label: f }));

export const actionResultExtraFields = [
  { field: 'URL', type: 'input' },
  { field: 'Deep link', type: 'input' },
  { field: 'Make a purchase', type: 'select' },
  { field: 'Custom ID', type: 'input' },
];

export const objectFitOptions = Object.values(IMAGE_OBJ_FIT)
  .map((o) => ({ value: o, label: o }));

export const getExtraField = (value) => {
  if (actionResultExtraFields.map((f) => f.field).includes(value)) {
    const founded = actionResultExtraFields
      .find((f) => f.field === value);

    return founded.type;
  }

  return null;
};
