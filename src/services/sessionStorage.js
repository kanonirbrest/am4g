export const getSSItem = (key) => JSON.parse(sessionStorage.getItem(key));
export const setSSItem = (key, value) => {
  if (typeof value === 'function') {
    sessionStorage.setItem(key, JSON.stringify(value()));
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeSSItem = (key) => {
  sessionStorage.removeItem(key);
};

export const clearSSStorage = () => {
  sessionStorage.clear();
};

export const SS_KEYS = {
  ACTIVE_PAGE: 'campaign_list_active_page',
  PER_PAGE: 'campaign_list_per_page',
  SORT: 'campaign_list_sort',
  GROUP: 'campaign_list_group',
  TYPE_FILTER: 'campaign_list_type_filter',
  SUB_TYPE_FILTER: 'campaign_list_sub_type_filter',
  AUTHOR_FILTER: 'campaign_list_author_filter',
};
