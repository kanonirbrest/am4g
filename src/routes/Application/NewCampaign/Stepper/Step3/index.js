import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@apollo/client';
import _get from 'lodash.get';

import ContentBox from 'components/ContentBox';
import Select from 'components/FormControls/Select/select';
import {
  GetAdditionalFilterView,
  GetFilterView,
} from 'routes/Application/NewCampaign/Stepper/Step3/utils';
import {
  getCountriesQuery,
  getRegionsQuery,
  getDevicesQuery,
  getPurposesQuery,
  getUserPropertyQuery,
  triggerEventsByApplicationIDQuery,
} from 'api/queries';
import { useFormikContext } from 'formik';

import Spinner from 'components/Spinner';
import AndLine from 'assets/icons/AndLine';
import { singleFilterProps } from 'utils/targetingConfig/targeting';
import { targetingFilters, additionalTargetingFilters } from 'utils/targetingConfig';
import {
  FILTER_TYPE, getFilterOptions,
} from 'utils/targetingConfig/utils';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30px',
  },
  label: {
    fontSize: '14px',
    color: '#3E4554',
    marginRight: '10px',
  },
  select: {
    minWidth: 240,
    background: '#fff',
  },
  andIcon: {
    marginLeft: '16px',
  },
  spinnerWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    height: 'calc(100vh - 350px)',
  },
}));
const name = 'step3.';

export default function Step3({
  activeApplication,
  campaignList,
  isEdit,
}) {
  const classes = useStyles();
  const formik = useFormikContext();
  const values = formik.values.step3;

  const [selectedFilter, setSelectedFilter] = useState('');
  const countriesResp = useQuery(getCountriesQuery, {
    variables: {
      filter: '',
    },
  });
  const regionsResp = useQuery(getRegionsQuery, {
    variables: {
      filter: '',
    },
  });
  const devicesResp = useQuery(getDevicesQuery, {
    variables: {
      filter: '',
    },
  });
  const triggerResp = useQuery(triggerEventsByApplicationIDQuery, {
    variables: {
      applicationId: activeApplication.id,
    },
  });
  const userPropResp = useQuery(getUserPropertyQuery, {
    variables: {
      applicationId: activeApplication.id,
    },
  });
  const purporsesResp = useQuery(getPurposesQuery, {
    variables: {
      applicationId: activeApplication.id,
    },
  });

  if (countriesResp.loading || devicesResp.loading
      || triggerResp.loading || userPropResp.loading
  || purporsesResp.loading || regionsResp.loading) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }
  const countries = countriesResp.data?.countries?.map(({ value, key }) => ({
    label: value,
    value: key,
  }));
  const devices = devicesResp.data?.device_models.map(({ value, key }) => ({
    label: value,
    value: key,
  }));
  const triggers = triggerResp.data.trigger_events;
  const userProp = userPropResp.data.user_properties;
  const purposes = purporsesResp.data.purposes.map(({ name: purposeName }) => ({
    label: purposeName,
    value: purposeName,
  }));
  const regions = regionsResp.data?.regions?.map(({ value, key }) => ({
    label: value,
    value: key,
  }));

  const props = {
    values, name,
  };
  const onRemove = (removedFilter, field, propName) => {
    const filters = values[field];
    formik.setFieldValue(`${name}${field}`,
      filters.filter((f) => f !== removedFilter));

    formik.setFieldValue(propName.slice(0, -1), undefined)
      .then(() => {
        formik.validateForm();
      });
  };
  const onAdd = (e, filterType) => {
    const filters = values[filterType];
    const target = e.target.value;
    setSelectedFilter('');
    const config = filterType === FILTER_TYPE.ADDITIONAL_FILTERS
      ? additionalTargetingFilters : targetingFilters;

    if (filters.includes(target)) {
      // check if multi
      if (!config[target]?.isMulti) {
        return;
      }
    }

    if (!singleFilterProps.map((f) => f.field).includes(target)) {
      let list = [..._get(formik.values, name + target, [])];
      if (list.length) {
        list.push(config[target]
          .defaultValues());
      } else {
        list = [config[target]
          .defaultValues()];
      }

      formik.setFieldValue(name + target, list);
    } else {
      const defaultValueProp = config[target].defaultValues(activeApplication.platform);
      formik.setFieldValue(name + target, defaultValueProp);
    }

    // not add if exist
    if (!_get(formik.values, `${name}${filterType}`, []).includes(target)) {
      formik.setFieldValue(`${name}${filterType}`, [...filters, target]);
    }
  };

  const options = getFilterOptions(
    activeApplication.platform, formik.values.step1.type, targetingFilters,
    values, FILTER_TYPE.FILTERS,
  );

  const additionalOptions = getFilterOptions(activeApplication.platform,
    formik.values.step1.type, additionalTargetingFilters,
    values, FILTER_TYPE.ADDITIONAL_FILTERS);

  return (
    <>
      <ContentBox label="Target the following segments">
        {
          values.filters.map((filter, index) => {
            if (targetingFilters[filter].isMulti) {
              return values[filter].map((item, andIndex) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <React.Fragment key={filter + andIndex}>
                  <GetFilterView
                    filters={values.filters}
                    countries={countries}
                    devices={devices}
                    purposes={purposes}
                    userProp={userProp}
                    regions={regions}
                    filter={filter}
                    andIndex={andIndex}
                    platform={activeApplication.platform}
                    campaignList={campaignList}
                    onRemove={(propName) => onRemove(
                      filter, FILTER_TYPE.FILTERS, propName,
                    )}
                    {...props}
                  />
                  {(andIndex !== values[filter].length - 1
                      || index !== values.filters.length - 1)
                  && <AndLine className={classes.andIcon} />}
                </React.Fragment>
              ));
            }

            return (
              <React.Fragment key={filter}>
                <GetFilterView
                  filters={values.filters}
                  countries={countries}
                  devices={devices}
                  purposes={purposes}
                  userProp={userProp}
                  regions={regions}
                  filter={filter}
                  andIndex={0}
                  platform={activeApplication.platform}
                  campaignList={campaignList}
                  onRemove={(propName) => onRemove(filter, FILTER_TYPE.FILTERS, propName)}
                  {...props}
                />
                {index !== values.filters.length - 1
                  && <AndLine className={classes.andIcon} />}
              </React.Fragment>
            );
          })
        }
        <div className={classes.container}>
          <div className={classes.label}>Add additional users filtered by</div>
          <Select
            options={options}
            value={selectedFilter}
            onChange={(e) => onAdd(e, FILTER_TYPE.FILTERS)}
            classes={{
              select: classes.select,
            }}
            disabled={options.length === 0}
            placeholder="Select"
          />
        </div>
      </ContentBox>
      <ContentBox
        label="Additionally filter users who"
      >
        {
          values.additionalFilters.map((filter, index) => {
            if (additionalTargetingFilters[filter].isMulti) {
              return values[filter].map((item, andIndex) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <React.Fragment key={filter + andIndex}>
                  <GetAdditionalFilterView
                    filters={values.additionalFilters}
                    filter={filter}
                    events={triggers}
                    campaignList={campaignList}
                    isEdit={isEdit}
                    activeApplication={activeApplication}
                    andIndex={andIndex}
                    {...props}
                  />
                  {(andIndex !== values[filter].length - 1
                      || index !== values.additionalFilters.length - 1)
                  && <AndLine className={classes.andIcon} />}
                </React.Fragment>
              ));
            }

            return (
              <React.Fragment key={filter}>
                <GetAdditionalFilterView
                  key={filter}
                  filters={values.additionalFilters}
                  filter={filter}
                  events={triggers}
                  campaignList={campaignList}
                  isEdit={isEdit}
                  activeApplication={activeApplication}
                  andIndex={0}
                  {...props}
                />
                {index !== values.additionalFilters.length - 1
                  && <AndLine className={classes.andIcon} />}
              </React.Fragment>
            );
          })
        }
        <div className={classes.container}>
          <div className={classes.label}>Add additional users filtered by</div>
          <Select
            options={additionalOptions}
            value={selectedFilter}
            onChange={(e) => onAdd(e, FILTER_TYPE.ADDITIONAL_FILTERS)}
            classes={{
              select: classes.select,
            }}
            disabled={additionalOptions.length === 0}
            placeholder="Select"
          />
        </div>
      </ContentBox>
    </>
  );
}
