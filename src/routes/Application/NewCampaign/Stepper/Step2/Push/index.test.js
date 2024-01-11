import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Push from 'routes/Application/NewCampaign/Stepper/Step2/Push';
import { Formik } from 'formik';
import { getStep2InitialValues } from 'utils/constants/campaignForm';
import { campaignType } from 'components/constants';
import { WithTheme } from 'utils/testUtils';

const activeApplication = {
  bundleId: 'y.s.test.app',
  id: 'f5d11ae1-8817-4ac3-bf65-7260dd9e7636',
  image: null,
  name: 'Test application',
  platform: 'android',
  projectId: 'apalon-test-986cd',
};
const allLanguages = [
  { id: '4fc06d2e-20a0-492f-8982-e39a9a495c27', title: 'English', locale: 'en' },
  { id: '2f39b974-aefd-4863-bd9f-bd4c4e7794f8', title: 'German', locale: 'de' },
  { id: '49a72cfa-2631-413b-ae85-74f1a5f0bcce', title: 'French', locale: 'fr' },
  { id: '49a72cfa-2631-413b-ae85-dd', title: 'Russian', locale: 'ru' },
  { id: '4f9d50f5-aff4-42a9-b435-cc1327a43587', title: 'Spanish', locale: 'es' }];
const props = {
  activeApplication,
  allLanguages,
};

const Wrapper = ({ type }) => (
  <WithTheme>
    <Formik
      initialValues={{ step2: getStep2InitialValues(type) }}
      onSubmit={() => {}}
    >
      <Push {...props} type={type} />
    </Formik>
  </WithTheme>
);
beforeEach(() => {
  render(
    <Wrapper type={campaignType.pushScheduled} />,
  );
});
describe('Push test', () => {
  it('should render', () => {
    expect(screen.getByText('CONTENT')).toBeInTheDocument();
    expect(screen.queryByText('Variant 1')).not.toBeInTheDocument();
  });
  it('should create variants', async () => {
    const button = await screen.findByText('Create variants');
    userEvent.click(button);

    expect(await screen.findByText('Variant 1')).toBeInTheDocument();
    expect(await screen.findByText('Variant 2')).toBeInTheDocument();
  });
  it('should add variant', async () => {
    const button = await screen.findByText('Create variants');
    userEvent.click(button);

    const addLanguages = await screen.findByText('+ Languages');
    userEvent.click(addLanguages);

    const Russian = await screen.findByText('Russian');
    userEvent.click(Russian);

    expect(await screen.findByText('English')).toBeInTheDocument();
    expect(await screen.findByText('Russian')).toBeInTheDocument();

    expect(screen.queryAllByText(/Variant \d/).length).toBe(2);
  });
  it('test add variant', async () => {
    const title = screen.getByPlaceholderText('Enter title');
    await userEvent.type(title, 'hello 1');
    expect(await screen.findByPlaceholderText('Enter title'))
      .toHaveValue('hello 1');
  });
  it('test add variant', async () => {
    const title = await screen.findByPlaceholderText('Enter title');
    await userEvent.type(title, 'hello 1');
    expect(await screen.findByPlaceholderText('Enter title'))
      .toHaveValue('hello 1');
    await screen.findByText('hello 1');

    const button = await screen.findByText('Create variants');
    userEvent.click(button);

    const addVariant = await screen.findByText('+ Add variant');
    userEvent.click(addVariant);

    const copyVariant = await screen.findByText('Copy from Variant 1');
    userEvent.click(copyVariant);

    const variant3 = await screen.findByText('Variant 3');
    userEvent.click(variant3);

    expect(await screen.findByPlaceholderText('Enter title'))
      .toHaveValue('hello 1');

    const variantButtons = await screen.findAllByTestId(/variant_\d/);
    expect(variantButtons[2].className).toMatch(/item/);
    expect(variantButtons[2].className).toMatch(/active/);
    expect(variantButtons[1].className).not.toMatch(/active/);
  });
});
