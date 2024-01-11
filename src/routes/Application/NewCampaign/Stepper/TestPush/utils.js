import * as Yup from 'yup';
import React from 'react';

export const deviceIdsSchema = Yup.object().shape({
  ids: Yup.array().nullable().min(1, 'Should be more than >= 1')
    .of(Yup.string().required('Required field')),
});

export const phoneOptions = {
  backgroundColor: '#8D95A9',
  type: 'color',
};

export const getErrorView = (messages, classes) => (
  <div className={classes.errorBlock}>
    Failed:
    <ul>
      {messages.map((m) => <li key={m}>{m}</li>)}
    </ul>
  </div>
);
