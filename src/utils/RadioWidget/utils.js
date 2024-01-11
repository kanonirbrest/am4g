import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_RADIO_OFFER_ITEM } from './constant';

export const onAddRadioItem = (languages, activeFieldIndex) => languages
  .map(
    (language) => {
      const { fields } = language;

      return {
        ...language,
        fields: fields
          .map((f, fIndex) => {
            if (fIndex === activeFieldIndex) {
              return {
                ...f,
                buttonList: [...f.buttonList, {
                  text: [
                    {
                      ...DEFAULT_RADIO_OFFER_ITEM,
                      id: uuidv4(),
                    },
                  ],
                  isSelected: false,
                  id: uuidv4(),
                  actionValue: {
                    product: '',
                  }, /* purchase value for each button */
                  darkBackground: false,
                }],
              };
            }

            return f;
          }),
      };
    },
  );

export const addRadioOfferForAllLanguages = (
  languages, fieldIndex, buttonIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList.map((button, buttonInd) => {
                if (buttonInd === buttonIndex) {
                  return {
                    ...button,
                    text: [
                      ...button.text, {
                        ...DEFAULT_RADIO_OFFER_ITEM,
                        id: uuidv4(),
                      },
                    ],
                  };
                }

                return button;
              }),
            };
          }

          return f;
        }),
    };
  },
);

export const updOfferForAllLanguages = (
  languages, fieldIndex, buttonIndex, offerIndex, offers,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList.map((button, buttonInd) => {
                if (buttonInd === buttonIndex) {
                  return {
                    ...button,
                    text: button.text.map((offerItem, offerInd) => {
                      if (offerInd === offerIndex) {
                        return {
                          ...offerItem,
                          offers,
                        };
                      }

                      return offerItem;
                    }),
                  };
                }

                return button;
              }),
            };
          }

          return f;
        }),
    };
  },
);

export const removeOfferRadio = (
  languages, fieldIndex, buttonIndex, offerIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList.map((button, buttonInd) => {
                if (buttonInd === buttonIndex) {
                  return {
                    ...button,
                    text: button.text.filter((offerItem, offerInd) => offerInd === offerIndex),
                  };
                }

                return button;
              }),
            };
          }

          return f;
        }),
    };
  },
);

export const removeRadioButton = (
  languages, fieldIndex, buttonIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList.filter(
                (button, buttonInd) => buttonInd !== buttonIndex,
              ),
            };
          }

          return f;
        }),
    };
  },
);

export const copyRadioButton = (
  languages, fieldIndex, copyIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: [...f.buttonList, f.buttonList[copyIndex]],
            };
          }

          return f;
        }),
    };
  },
);

export const updDarkMode = (
  languages, fieldIndex, buttonIndex, value,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList.map((button, buttonInd) => {
                if (buttonInd === buttonIndex) {
                  return {
                    ...button,
                    darkBackground: value,
                  };
                }

                return button;
              }),
            };
          }

          return f;
        }),
    };
  },
);

export const handleSelectDefault = (
  languages, fieldIndex, buttonIndex,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList.map((button, buttonInd) => {
                if (buttonInd === buttonIndex) {
                  return {
                    ...button,
                    isSelected: true,
                  };
                }

                return {
                  ...button,
                  isSelected: false,
                };
              }),
            };
          }

          return f;
        }),
    };
  },
);

export const handleChooseProduct = (
  languages, fieldIndex, buttonIndex, value,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList
                .map((button, buttonInd) => {
                  if (buttonInd === buttonIndex) {
                    return {
                      ...button,
                      actionValue: value,
                    };
                  }

                  return button;
                }),
            };
          }

          return f;
        }),
    };
  },
);

export const handleChooseOffer = (
  languages, fieldIndex, buttonIndex, offer,
) => languages.map(
  (language) => {
    const { fields } = language;

    return {
      ...language,
      fields: fields
        .map((f, index) => {
          if (index === fieldIndex) {
            return {
              ...f,
              buttonList: f.buttonList
                .map((button, buttonInd) => {
                  if (buttonInd === buttonIndex) {
                    return {
                      ...button,
                      actionValue: {
                        ...button.actionValue,
                        offer,
                      },
                    };
                  }

                  return button;
                }),
            };
          }

          return f;
        }),
    };
  },
);
