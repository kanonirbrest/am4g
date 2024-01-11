import React from 'react';
import { useLocation } from 'react-router-dom';

const INTERVAL = 30000;
export const BACKUP_KEY = 'campaign_backup';
export const BACKUP_QUERY_KEY = 'backup';

export default (formik, activeApplicationId) => {
  // to pass form data for backup
  const formRef = React.useRef(null);
  const { search } = useLocation();

  React.useEffect(() => {
    const isBackup = new URLSearchParams(search).get(BACKUP_QUERY_KEY);
    if (isBackup) {
      const campaign = localStorage.getItem(BACKUP_KEY);
      if (campaign) {
        formik.setValues(JSON.parse(campaign));
      }
    }
    const intervalId = setInterval(() => {
      if (formRef.current.dirty) {
        localStorage.setItem(BACKUP_KEY, JSON.stringify({
          ...formRef.current.values,
          applicationId: activeApplicationId,
        }));
      } else if (localStorage.getItem(BACKUP_KEY)) {
        localStorage.removeItem(BACKUP_KEY);
      }
    }, INTERVAL);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  formRef.current = { values: formik.values, dirty: formik.dirty };

  return null;
};
