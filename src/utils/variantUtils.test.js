import {
  addVariant, copyFromVariant, createVariant, removeVariant, renameVariant,
} from 'utils/variantUtils';

const LANGUAGES_MOCK = {
  en: [{
    name: 'Variant 1',
    content: {
      body: 'body test',
      image: null,
      isBigPicture: false,
      title: null,
    },
  }],
};
const MULTI_LANGUAGES_MOCK = {
  en: [{
    name: 'Variant 1',
    content: {
      body: 'body multiple',
      image: null,
      isBigPicture: false,
      title: null,
    },
  }],
  ru: [{
    name: 'Variant 1',
    content: {
      body: null,
      image: null,
      isBigPicture: false,
      title: null,
    },
  }],
};

describe('Variant Utils', () => {
  it('should create variant', () => {
    const result = createVariant(LANGUAGES_MOCK);
    expect(result.en).toHaveLength(2);
    expect(result.en[0].name).toBe('Variant 1');
    expect(Object.keys(result)).toHaveLength(1);
  });
  it('should add variant', () => {
    expect(MULTI_LANGUAGES_MOCK.en).toHaveLength(1);
    expect(LANGUAGES_MOCK.en).toHaveLength(1);
    const result = addVariant(LANGUAGES_MOCK);
    const multiResult = addVariant(MULTI_LANGUAGES_MOCK);
    expect(result.en).toHaveLength(2);
    expect(multiResult.en).toHaveLength(2);
    expect(result.en).toHaveLength(2);
    expect(multiResult.ru).toHaveLength(2);
    expect(multiResult.ru[1].name).toBe('Variant 2');
    expect(Object.keys(multiResult)).toHaveLength(2);
    expect(Object.keys(result)).toHaveLength(1);
  });
  it('should remove variant', () => {
    const result = addVariant(addVariant(addVariant(LANGUAGES_MOCK)));
    expect(result.en).toHaveLength(4);
    expect(result.en[3].name).toBe('Variant 4');
    const afterRemove = removeVariant(2, result);
    expect(afterRemove.en).toHaveLength(3);
    expect(afterRemove.en[2].name).toBe('Variant 4');
    expect(afterRemove.en.findIndex((v) => v.name === 'Variant 3')).toBe(-1);
  });
  it('should remove variant multi', () => { //
    const result = addVariant(addVariant(addVariant(MULTI_LANGUAGES_MOCK)));
    expect(result.en).toHaveLength(4);
    expect(result.ru).toHaveLength(4);
    expect(result.en[3].name).toBe('Variant 4');
    expect(result.ru[3].name).toBe('Variant 4');
    const afterRemove = removeVariant(2, result);
    expect(afterRemove.en).toHaveLength(3);
    expect(afterRemove.ru).toHaveLength(3);
    expect(afterRemove.en[2].name).toBe('Variant 4');
    expect(afterRemove.ru[2].name).toBe('Variant 4');
    expect(afterRemove.en.findIndex((v) => v.name === 'Variant 3')).toBe(-1);
    expect(afterRemove.ru.findIndex((v) => v.name === 'Variant 3')).toBe(-1);
  });
  it('should rename variant', () => {
    const result = addVariant((LANGUAGES_MOCK));
    expect(result.en[1].name).toBe('Variant 2');
    const afterRename = renameVariant(1, 'test name', result, 'en').result;
    expect(afterRename.en[1].name).toBe('test name');
  });
  it('should rename variant multi', () => {
    const result = addVariant((MULTI_LANGUAGES_MOCK));
    expect(result.en[1].name).toBe('Variant 2');
    expect(result.ru[1].name).toBe('Variant 2');
    const afterRename = renameVariant(1, 'test name', result, 'en').result;
    expect(afterRename.en[1].name).toBe('test name');
    expect(afterRename.ru[1].name).toBe('test name');
  });
  it('should copy variant', () => {
    const result = addVariant(LANGUAGES_MOCK);
    const afterCopy = copyFromVariant('Variant 1', result);
    expect(afterCopy.en[2].name).toBe('Variant 3');
    expect(afterCopy.en[2].content.body).toBe('body test');
  });
  it('should copy variant multi', () => {
    const result = addVariant(MULTI_LANGUAGES_MOCK);
    const afterCopy = copyFromVariant('Variant 1', result);
    expect(afterCopy.en[2].name).toBe('Variant 3');
    expect(afterCopy.en[2].content.body).toBe('body multiple');
    expect(Object.keys(afterCopy.en)).toHaveLength(3);
    expect(Object.keys(afterCopy.ru)).toHaveLength(3);
  });
});
