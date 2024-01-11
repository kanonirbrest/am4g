import { getStatisticHtml } from 'routes/Application/Reports/Statistic/InApp/Html';

const mockData = [
  {
    date: '2022-08-17T00:00:00.000Z',
    type: 'close',
    count: 3,
    variant: null,
  },
  {
    date: '2022-08-17T00:00:00.000Z',
    type: 'html_text_input_submit',
    count: 3,
    variant: null,
  },
  {
    date: '2022-08-17T00:00:00.000Z',
    type: 'impression',
    count: 5,
    variant: null,
  },
  {
    date: '2022-08-17T00:00:00.000Z',
    type: 'test_button',
    count: 5,
    variant: null,
  },
  {
    date: '2022-08-18T00:00:00.000Z',
    type: 'impression',
    count: 14,
    variant: null,
  },
  {
    date: '2022-08-18T00:00:00.000Z',
    type: 'html_text_input_submit',
    count: 12,
    variant: null,
  },
  {
    date: '2022-08-18T00:00:00.000Z',
    type: 'close',
    count: 12,
    variant: null,
  },
  {
    date: '2022-08-18T00:00:00.000Z',
    type: 'test_button',
    count: 5,
    variant: null,
  },
  {
    date: '2022-08-19T00:00:00.000Z',
    type: 'impression',
    count: 6,
    variant: null,
  },
  {
    date: '2022-08-19T00:00:00.000Z',
    type: 'html_text_input_submit',
    count: 4,
    variant: null,
  },
  {
    date: '2022-08-19T00:00:00.000Z',
    type: 'test_button',
    count: 5,
    variant: null,
  },
];
const mockMapper = {
  type: 'HTML',
  'e850d739-b730-464d-965a-b640e05e60ad-button': 'Submit',
  close: 'Close',
  html_text_input_submit: 'Feedback submitted',
  test_button: 'Test Button',
};
const mockServerLabels = ['close',
  'trigger',
  'impression'];
describe('Statistic render methods', () => {
  it('should show feedback submit if label presented in data', () => {
    const { columns } = getStatisticHtml([
      ...mockServerLabels,
      'html_text_input_submit',
    ], mockData, 'TYPE_IN_APP_HTML', '', mockMapper);

    expect(columns).toEqual(expect.arrayContaining([expect
      .objectContaining({
        headerName: 'Feedback submitted',
        field: 'html_text_input_submit',
      }),
    ]));
    expect(columns).toEqual(expect.not.arrayContaining([expect
      .objectContaining({
        headerName: 'Feedback submitted clicks',
        field: 'html_text_input_submit',
      }),
    ]));
    expect(columns).toEqual(expect.not.arrayContaining([expect
      .objectContaining({
        headerName: 'Conv Feedback submitted, %',
        field: 'html_text_input_submit_conversion',
      }),
    ]));
  });
  it('should ignore feedback submit if label presented in data', () => {
    const { columns } = getStatisticHtml([
      ...mockServerLabels,
    ], mockData,
    'TYPE_IN_APP_HTML', '', mockMapper);
    expect(columns).toEqual(expect.not.arrayContaining([expect
      .objectContaining({
        headerName: 'Feedback submitted',
        field: 'html_text_input_submit',
      }),
    ]));
  });
  it('should show test button conv and clicks label presented in data', () => {
    const { columns } = getStatisticHtml([
      ...mockServerLabels,
      'test_button',
    ], mockData, 'TYPE_IN_APP_HTML', '', mockMapper);

    expect(columns).toEqual(expect.arrayContaining([expect
      .objectContaining({
        headerName: 'Test Button clicks',
        field: 'test_button',
      }),
    ]));
    expect(columns).toEqual(expect.arrayContaining([expect
      .objectContaining({
        headerName: 'Conv Test Button, %',
        field: 'test_button_conversion',
      }),
    ]));
  });
});
