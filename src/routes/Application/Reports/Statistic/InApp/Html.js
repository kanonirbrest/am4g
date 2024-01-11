import _groupBy from 'lodash.groupby';
import { getValidDate } from 'utils/dateUtils';
import { DATE_CHART_FORMAT } from 'utils/constants/date';
import {
  division, getFieldsEngOrFirstLang, getInitialDay,
  multiplePercentage, renderCell, renderCellFormatted, renderHeader,
} from 'routes/Application/Reports/Statistic/utils';
import { formatData } from 'utils';
import { GENERAL_STATS_TAB } from 'routes/Application/Reports/constants';
import { DEVICE_CONTROL } from 'utils/constants';
import { DEFAULT_EDITOR_CLASS } from 'components/Editor/constant';

const BUTTON_TEXT_CONTENT_REGEXP = />(.|\n)*?</ig;

const getTitle = (label, nameMapper, isConv) => {
  const type = label.split('-').pop();

  if (isConv) {
    if (label === 'close') {
      return 'Conversion Close';
    } if (type === 'image') {
      return `Conversion image ${nameMapper[label]}, %`;
    } if (type === 'button') {
      return `Conversion button ${nameMapper[label]}, %`;
    }
  } else {
    if (label === 'close') {
      return 'Clicks on Close';
    } if (type === 'image') {
      return `Clicks on image ${nameMapper[label]}`;
    } if (type === 'button') {
      return `Clicks on button ${nameMapper[label]}`;
    }
  }

  return label;
};
export const excludedHTML = ['impression', 'trigger', 'page_shown'];
export const HTMLPostfix = '_conversion';
const addInitialDataToRows = (rows, htmlLabels) => {
  if (rows.length) {
    const labelData = {};
    htmlLabels.forEach((l) => {
      labelData[l] = 0;
      labelData[l + HTMLPostfix] = 0;
    });

    // to start chart from 0 dot when we have 1 item
    return [
      {
        id: 'initial',
        date: getInitialDay(rows),
        impression: 0,
        ...labelData,
      }, ...rows,
    ];
  }

  return rows;
};

const getFormattedData = (row, d, labels) => {
  const formatted = {
    date: getValidDate(d, DATE_CHART_FORMAT),
    impression: row.impression,
    page_shown: row.page_shown,
    pageId: row.pageId,
  };
  labels.forEach((key) => {
    if (!excludedHTML.includes(key)) {
      formatted[key] = row[key];
      formatted[`${key}${HTMLPostfix}`] = multiplePercentage(division(
        row[key], row.impression,
      ));
    }
  });

  return formatted;
};

const htmlColumns = [
  {
    field: 'date',
    headerName: 'date',
    flex: 1,
    sortComparator: (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime(),
  },
  {
    field: 'impression',
    headerName: 'impression',
    renderHeader,
    renderCell,
    flex: 1,
    sortable: false,
  },
];
const htmlPageColumns = [
  {
    field: 'date',
    headerName: 'date',
    flex: 1,
    sortComparator: (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime(),
  },
  {
    field: 'page_shown',
    headerName: 'page shown',
    renderHeader,
    renderCell,
    flex: 1,
    sortable: false,
    tooltip: 'Equals how many times this Page was opened',
  },
];
// show impression only for general, for pages we show page_shown
const getHtmlLabels = (serverLabels, pageId) => [(pageId === GENERAL_STATS_TAB
  ? 'impression' : 'page_shown'),
...serverLabels.filter(
  (key) => key.includes('button')
      || key.includes('image')
      || key === 'html_text_input_submit'
      || key === 'close',
)];
export const getTotalHtml = (rows, labelsProp, pageId) => {
  const total = {};

  const labels = getHtmlLabels(labelsProp, pageId);
  const totalImpressions = rows
    .reduce((sum, next) => sum + (next.impression || 0), 0);

  labels
    .forEach((column) => {
      total[column] = rows
        .reduce((a, b) => a + (b[column] || 0), 0);
    });

  labels
    .filter((key) => ![...excludedHTML, 'html_text_input_submit'].includes(key))
    .forEach((key) => {
      total[`${key}${HTMLPostfix}`] = formatData(
        multiplePercentage(division(total[key], totalImpressions)),
      );
    });

  return total;
};

// TODO: remove type
export const getStatisticHtml = (labelsArg, data, type, variant, nameMapper, pageId) => {
  const labels = getHtmlLabels(labelsArg, pageId);
  const htmlLabels = labels
    .filter((key) => !excludedHTML.includes(key));

  const groupedValues = _groupBy(data, 'date');
  const rows = Object.keys(groupedValues)
    .map((date, id) => {
      const row = {};
      groupedValues[date].forEach((item) => {
        row[item.type] = item.count;
      });

      return {
        id,
        ...getFormattedData(row, date, htmlLabels),
      };
    });

  const columns = [...(pageId === GENERAL_STATS_TAB ? htmlColumns
    : htmlPageColumns), ...htmlLabels.map((l) => ({
    field: l,
    // for feedback use label without postfix
    headerName: l !== 'html_text_input_submit'
      ? `${nameMapper[l]} clicks` : nameMapper[l],
    title: getTitle(l, nameMapper),
    renderHeader,
    renderCell,
    flex: 1,
    sortable: false,
  })), ...htmlLabels
  // don't show conversion for feedback
    .filter((l) => l !== 'html_text_input_submit')
    .map((l) => ({
      field: `${l}${HTMLPostfix}`,
      headerName: `Conv ${nameMapper[l]}, %`,
      title: getTitle(l, nameMapper, true),
      renderHeader,
      renderCell: renderCellFormatted,
      flex: 1,
      sortable: false,
    }))];

  return {
    initialSorting: {
      sorting: {
        sortModel: [
          {
            field: 'date',
            sort: 'desc',
          },
        ],
      },
    },
    rows,
    chartRows: addInitialDataToRows(rows, htmlLabels),
    columns,
    variantsArr: [],
  };
};

export const getHTMLNameMapper = (data) => {
  const nameMapper = {};

  const { fields } = getFieldsEngOrFirstLang(data);
  fields.forEach(({
    index, type, text, backgroundFile,
  }) => {
    if (Array.isArray(text)) {
      // eslint-disable-next-line no-param-reassign
      text = text[0].text;
    }
    if (type === DEVICE_CONTROL.IMAGE) {
      nameMapper[`${index}-${type}`] = `${backgroundFile.name}`
          || `${index}-${type}`;
    } else if (type === DEVICE_CONTROL.BUTTON || type === DEVICE_CONTROL.NPS_BUTTON) {
      let resultText;
      if (type === DEVICE_CONTROL.BUTTON && text.includes(DEFAULT_EDITOR_CLASS)) {
        // to handle button with html inside
        let regexpMatch = text.match(BUTTON_TEXT_CONTENT_REGEXP);
        if (regexpMatch?.length) {
          regexpMatch = regexpMatch.map((i) => (i ? i.slice(1, -1) : false))
            .filter(Boolean);
        }
        resultText = regexpMatch?.length ? regexpMatch[0] : null;
      } else {
        resultText = text || `${index}-${type}`;
      }

      nameMapper[`${index}-${type}`] = `${resultText}` || `${index}-${type}`;
    }
  });

  return {
    type: 'HTML',
    ...nameMapper,
    close: 'Close',
    html_text_input_submit: 'Feedback submitted',
  };
};
