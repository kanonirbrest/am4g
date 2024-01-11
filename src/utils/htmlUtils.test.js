import { wrapField } from 'utils/htmlUtils';
import { campaignType } from 'components/constants';
import sliderScript, {
  onClickNextForm,
} from 'utils/constants/html';
import { OPEN_ACTION } from 'utils/constants/campaign';
import { DEVICE_CONTROL } from 'utils/constants';

const SUBMIT_FRAGMENT = 'function sub(){';
const npsLanguages = [{
  name: 'English',
  fields: [
    {
      type: DEVICE_CONTROL.NPS_SCORE,
      index: 'a6fc25aa-e3a4-45a5-961e-94ef1d443a4d',
    },
    {
      type: DEVICE_CONTROL.NPS_DESCRIPTION,
      index: 'a6fc25aa-e3a4-45a5-961e-94ef1d443a4d',
    },
    {
      type: DEVICE_CONTROL.NPS_SLIDER,
      index: 'a6fc25aa-e3a4-45a5-961e-94ef1d443a4d',
      mapper: [],
    },
    {
      text: OPEN_ACTION.SUBMIT,
      type: DEVICE_CONTROL.NPS_BUTTON,
    },
  ],
  locale: 'en',
}];

const languages = [
  {
    name: 'English',
    fields: [
      {
        text: 'text placeholder',
        type: DEVICE_CONTROL.FEEDBACK,
        index: 'd73f4a82-ffaa-4187-a3d6-3c2fc42b0a1d',
      },
      {
        text: 'Submit action',
        type: DEVICE_CONTROL.BUTTON,
        index: '8667e6c4-8de4-4f66-91b4-1966f4a73b41',
        actions: [{
          action: OPEN_ACTION.SUBMIT,
        }],
      },
    ],
    locale: 'en',
  },
];

const htmlView = (
  ` <body
    id="device-bound"
  >
    <form data-onsubmit="true">
      <div className="react-grid-layout makeStyles-layout-780">
        <div
          data-index="d73f4a82-ffaa-4187-a3d6-3c2fc42b0a1d"
          className="react-grid-item"
        >
          <textarea
            name="d73f4a82-ffaa-4187-a3d6-3c2fc42b0a1d-feedback"
            placeholder="text placeholder"
            className="textAreaOpacity"
            required=""
            rows="30"
          />
        </div>
        <div
          className="react-grid-item"
        >
          <button
            type="submit"
            data-key="8667e6c4-8de4-4f66-91b4-1966f4a73b41-button"
          >
            Submit action
          </button>
        </div>
      </div>
    </form>
  </body>`
);

describe('HTML Utils', () => {
  it('should add submit method (click next part)', () => {
    expect(wrapField(htmlView, campaignType.inAppHTML, languages, []))
      .toContain(onClickNextForm);
  });
  it('should add submit method (base method)', () => {
    expect(wrapField(htmlView, campaignType.inAppHTML, languages, []))
      .toContain(SUBMIT_FRAGMENT);
  });
  it('should not add submit method', () => {
    const withoutSubmitLangs = [...languages];
    withoutSubmitLangs[0].fields[1].actions[0].action = OPEN_ACTION.URL;
    expect(wrapField(htmlView, campaignType.inAppHTML, withoutSubmitLangs, []))
      .not.toContain(SUBMIT_FRAGMENT);
  });
  it('should add nps script', () => {
    expect(wrapField(htmlView, campaignType.inAppHTML, npsLanguages, []))
      .toContain(sliderScript);
  });
});
