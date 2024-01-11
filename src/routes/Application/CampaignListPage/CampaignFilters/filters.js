import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';

import CheckboxFieldsGroup from 'components/FormControls/CheckboxGroup';
import { CAMPAIGN_TYPE_LABEL } from 'components/constants';
import FormikCheckbox from 'components/FormControls/Checkbox';
import { campaignStatuses }
  from 'routes/Application/CampaignListPage/CampaignFilters/constants';
import Arrow from 'assets/icons/Arrow';
import CAMPAIGN_TYPE_OPTIONS
  from 'routes/Application/NewCampaign/Stepper/Step1/Tabs/constant';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '10px',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#6C7688',
  },
  accordion: {
    background: 'transparent',
    boxShadow: 'none !important',
    '&:before': {
      background: 'none',
    },
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '21px',
    paddingBottom: '10px',
  },
  accordionSummary: {
    flexDirection: 'row-reverse',
    minHeight: '40px !important',
    padding: 0,
  },
  accordionSummaryContent: {
    padding: 0,
    margin: 0,
  },
  accordionSummaryExpanded: {
    margin: '0!important',
  },
  expandIcon: {
    height: '20px',
    marginRight: '0',
  },
  checkBoxLabel: {
    fontSize: '12px',
  },
  checkBox: {
    padding: '4px 10px',
  },
  expanded: {
    margin: '0 !important',
  },
}));

const getAccordionSummaryStyles = (name, classes) => ({
  id: `${name}-header`,
  'aria-controls': `${name}-content`,
  expandIcon: <Arrow />,
  classes: {
    root: classes.accordionSummary,
    expandIcon: classes.expandIcon,
    content: classes.accordionSummaryContent,
    expanded: classes.accordionSummaryExpanded,
  },
});

export default ({
  filterValues,
  subTypeFilters,
  setActivePage,
  authors,
  filterAuthor,
}) => {
  const classes = useStyles();
  const {
    setValues, handleSubmit, values, setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    setValues((vals) => ({ ...vals, ...filterValues }));
  }, [filterValues]);
  useEffect(() => {
    setValues((vals) => ({ ...vals, ...subTypeFilters }));
  }, [subTypeFilters]);
  useEffect(() => {
    setValues((vals) => ({ ...vals, ...filterAuthor }));
  }, [filterAuthor]);

  return (
    <>
      <Accordion classes={{
        root: classes.accordion,
        expanded: classes.expanded,
      }}
      >
        <AccordionSummary
          {...getAccordionSummaryStyles('status-panels', classes)}
        >
          <div className={classes.heading}>VIEW BY STATUS</div>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionDetails }}>
          {
                        campaignStatuses.map(({ field, label }) => (
                          <FormikCheckbox
                            label={label}
                            key={label}
                            onChange={(e) => {
                              setActivePage(0);
                              setFieldValue(field, e.target.checked);
                              handleSubmit();
                            }}
                            checked={values[field]}
                          />
                        ))
                    }
        </AccordionDetails>
      </Accordion>
      <Accordion classes={{
        root: classes.accordion,
        expanded: classes.expanded,
      }}
      >
        <AccordionSummary
          {...getAccordionSummaryStyles('types-panel', classes)}
        >
          <div className={classes.heading}>VIEW BY TYPE</div>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionDetails }}>
          { Object.keys(CAMPAIGN_TYPE_OPTIONS).map((
            type,
          ) => {
            const typeValue = `TYPE_${type}`;
            // use getCampaignListByType(type) if want to show all subtypes in filters
            const child = CAMPAIGN_TYPE_OPTIONS[type].map((f) => ({
              label: f.label,
              field: f.value,
            }));

            return (
              <CheckboxFieldsGroup
                field={typeValue}
                label={CAMPAIGN_TYPE_LABEL[typeValue]}
                child={child}
                key={typeValue}
                setActivePage={setActivePage}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion classes={{
        root: classes.accordion,
        expanded: classes.expanded,
      }}
      >
        <AccordionSummary
          {...getAccordionSummaryStyles('status-panels', classes)}
        >
          <div className={classes.heading}>VIEW BY AUTHOR</div>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionDetails }}>
          {
                        authors.map((author) => (
                          <FormikCheckbox
                            label={author}
                            key={author}
                            onChange={(e) => {
                              setActivePage(0);
                              setFieldValue(author, e.target.checked);
                              handleSubmit();
                            }}
                            checked={!!values[author]}
                          />
                        ))
                    }
        </AccordionDetails>
      </Accordion>
    </>
  );
};
