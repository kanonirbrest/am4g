/* eslint-disable no-unused-vars */
import React, {
  useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useFormikContext } from 'formik';

import {
  defaultEng,
} from 'utils/constants/campaignForm';
import useBackup, { BACKUP_KEY } from 'hooks/useBackup';
import { getDefaultFields, getDefaultStyles } from 'utils/campaignUtils';
import { useQuery } from '@apollo/client';
import _get from 'lodash.get';
import { copyObject } from 'utils';
import { applicationByIdQuery } from 'api/queries';

export default function FormAsyncLogic({
  activeApplication,
  isEdit = false,
  initialProductValues,
  setAllProducts,
  schema,
  isAfterSave,
}) {
  const history = useHistory();
  const formik = useFormikContext();

  useEffect(() => {
    const unblock = history.block(() => {
      if (formik.dirty && !isAfterSave.current) {
        return window // eslint-disable-line no-alert
          .confirm(
            'Leave without saving?\nYour unsaved changes will be lost.',
          );
      }

      return true;
    });

    return () => unblock();
  }, [formik.dirty, isAfterSave]);
  useBackup(formik, activeApplication?.id);
  // TODO: move to inApp HTML
  useQuery(applicationByIdQuery, {
    variables: {
      id: activeApplication.id,
    },
    onCompleted: (productsData) => {
      const products = (productsData?.application.products || [])
        .map((p) => ({
          ...p,
          alias:
            _get(formik.values, `step2.products['${p.productId}'].alias`, p.productId),
        }));
      setAllProducts(products);
      // eslint-disable-next-line no-param-reassign
      initialProductValues.current = copyObject(products);
    },
  });
  useEffect(() => {
    const values = formik.values.step2;
    const name = 'step2.';
    if (values.messageType) {
      if (isEdit) {
        values.languages.forEach((l, i) => {
          formik.setFieldValue(`${name}languages[${i}].fields`,
            isEdit ? l.fields : getDefaultFields(values.messageType));
        });
      } else {
        const styles = getDefaultStyles(values.messageType);
        Object.keys(styles).forEach((key) => {
          formik.setFieldValue(`${name}${key}`,
            styles[key]);
        });
        formik.setFieldValue(`${name}languages`, [{
          ...defaultEng,
          fields: getDefaultFields(values.messageType),
        }]);
      }
    }
  }, [formik.values.step2.messageType]);
  useEffect(() => {
    formik.validateForm(); /* to re-validate form on back button click */
  }, [schema]);

  // TODO pass setField instead of formik
  return (
    <>
    </>
  );
}
