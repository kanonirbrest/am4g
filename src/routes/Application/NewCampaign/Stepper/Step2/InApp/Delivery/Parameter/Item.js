import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useLazyQuery } from '@apollo/client';
import { useFormikContext } from 'formik';
import _get from 'lodash.get';

import FormikSelect from 'components/FormControls/Select';
import { triggerEventParameterValues } from 'api/queries';
import RemoveButton from 'components/RemoveButton';
import FormikAutocomplete from 'components/FormControls/Autocomplete';
import AndLine from 'assets/icons/AndLine';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  lightLabel: {
    fontSize: '12px',
    color: '#6C7688',
    marginBottom: '5px',
    textAlign: 'start',
  },
  equality: {
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  inputContainer: {
    minWidth: '200px',
  },
  removeBtn: {
    marginLeft: '10px',
  },
}));

export default ({
  selectedTrigger,
  index,
  triggerNameOptions,
  name,
  valuesName,
  isLast,
  isMultiple,
}) => {
  const classes = useStyles();
  const { values, setFieldValue, handleChange } = useFormikContext();

  const triggeringValues = _get(values, name);

  const [getData, { loading, data: paramResp }] = useLazyQuery(
    triggerEventParameterValues,
  );
  useEffect(() => {
    if (triggeringValues[valuesName][index].name) {
      const eventParameterId = selectedTrigger?.parameters.find(
        (item) => item.name === triggeringValues[valuesName][index].name,
      )?.id;

      getData({
        variables: {
          eventParameterId,
        },
      });
    }
  }, [triggeringValues[valuesName][index].name]);
  const triggerValueOptions = paramResp?.event_parameter_values
    .map((p) => ({
      label: p.value,
      value: p.value,
    })) || [];

  return (
    <>
      <div
        className={classes.container}
        style={{
          marginBottom: isLast ? '10px' : '0px',
        }}
      >
        <div className={classes.inputContainer}>
          <div className={classes.lightLabel}>
            Parameter name
          </div>
          <FormikSelect
            options={triggerNameOptions}
            name={`${name}.${valuesName}[${index}].name`}
            value={triggeringValues[valuesName][index].name}
            placeholder="Choose parameter name"
            onChange={(e) => {
              setFieldValue(`${name}.${valuesName}[${index}].value`, '');
              handleChange(e);
            }}
          />
        </div>
        <div className={classes.equality}>
          =
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.lightLabel}>
            Parameter value
          </div>
          {!isMultiple && (loading ? '...loading' : (
            <FormikSelect
              options={triggerValueOptions}
              name={`${name}.${valuesName}[${index}].val`}
              value={triggeringValues[valuesName][index].val[0]}
              disabled={!triggeringValues[valuesName][index].name}
              required
              onChange={(e) => {
                setFieldValue(
                  `${name}.${valuesName}[${index}].val[0]`, e.target.value,
                );
              }}
              placeholder="Choose parameter name"
            />
          ))}
          {isMultiple && (loading ? '...loading' : (
            <FormikAutocomplete
              options={triggerValueOptions}
              name={`${name}.${valuesName}[${index}].val`}
              value={triggeringValues[valuesName][index].val}
              placeholder="Choose parameter name"
              required
              disabled={!triggeringValues[valuesName][index].name}
            />
          ))}
        </div>
        <RemoveButton
          onClick={() => {
            setFieldValue(`${name}.${valuesName}`,
              triggeringValues[valuesName].filter((item,
                ind) => ind !== index));
          }}
          classes={{ root: classes.removeBtn }}
        />
      </div>
      {!isLast && <AndLine className={classes.andIcon} />}
    </>
  );
};
