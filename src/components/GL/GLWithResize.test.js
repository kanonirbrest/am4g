import { getGridItem } from 'components/GL/fields';
import {
  render, screen,
} from '@testing-library/react';
import React from 'react';
import {
  buttonOpenActionProps,
  buttonSubmitAndOpenProps,
  buttonSubmitProps,
  feedbackProps, feedbackPropsPage2, npsPropsPage2,
}
  from 'components/GL/mockData';
import AllProductsContext from 'contexts/Products';
import OfferStateContext from 'contexts/OfferState';
import GridItem from './Components';

const WithButtonContext = ({ children }) => (
  <OfferStateContext.Provider value={{ offers: [] }}>
    <AllProductsContext.Provider value={{ allProducts: [] }}>
      {children}
    </AllProductsContext.Provider>
  </OfferStateContext.Provider>
);
describe('Statistic render methods', () => {
  it('should add correct attrs for open page button', () => {
    render(
      <WithButtonContext><GridItem {...buttonOpenActionProps} /></WithButtonContext>,
    );
    const openPageButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(JSON.parse(openPageButton
      .getAttribute('data-pages')).length).toBe(2);
    expect(openPageButton).toHaveAttribute('data-destination', 'uuid-dest');
    expect(openPageButton).toHaveAttribute('data-currentpage', '1');
    expect(openPageButton)
      .toHaveAttribute('data-key', '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button');
    expect(openPageButton)
      .toHaveAttribute('data-close', 'false');
  });
  it('should add correct attrs for submit button', () => {
    render(
      <WithButtonContext><GridItem {...buttonSubmitProps} /></WithButtonContext>,
    );

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(JSON.parse(submitButton
      .getAttribute('data-pages')).length).toBe(2);
    expect(submitButton).not.toHaveAttribute('data-destination');
    expect(submitButton).toHaveAttribute('data-currentpage', '1');
    expect(submitButton)
      .toHaveAttribute('data-key', '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button');
    expect(submitButton)
      .toHaveAttribute('data-close', 'true');
  });
  it('should add correct attrs for submit and open page button', () => {
    render(
      <WithButtonContext>
        <GridItem {...buttonSubmitAndOpenProps} />
      </WithButtonContext>,
    );

    const submitAndOpenButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(JSON.parse(submitAndOpenButton
      .getAttribute('data-pages')).length).toBe(2);
    expect(submitAndOpenButton).toHaveAttribute('data-destination', 'uuid-submit');
    expect(submitAndOpenButton).toHaveAttribute('data-currentpage', '1');
    expect(submitAndOpenButton)
      .toHaveAttribute('data-key', '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-button');
    expect(submitAndOpenButton)
      .toHaveAttribute('data-close', 'false');
  });
  it('should add correct attrs for feedback', () => {
    render(
      <GridItem {...feedbackProps} />,
    );

    const feedback = screen.getByPlaceholderText('Submit');
    expect(feedback).not.toHaveAttribute('data-pages');
    expect(feedback).not.toHaveAttribute('data-destination');
    expect(feedback).not.toHaveAttribute('data-close');
    expect(feedback).toBeEnabled();
    expect(feedback).toBeRequired();
    expect(feedback).toHaveAttribute('data-currentpage', '1');
    expect(feedback)
      .toHaveAttribute('data-key',
        '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-feedback');
  });
  it('should add correct attrs for feedback', () => {
    render(
      <GridItem {...feedbackPropsPage2} />,
    );

    const feedback = screen.getByPlaceholderText('Submit');
    expect(feedback).not.toHaveAttribute('data-pages');
    expect(feedback).not.toHaveAttribute('data-destination');
    expect(feedback).not.toHaveAttribute('data-close');
    expect(feedback).toBeDisabled();
    expect(feedback).not.toBeRequired();
    expect(feedback).toHaveAttribute('data-currentpage', '2');
    expect(feedback)
      .toHaveAttribute('data-key',
        '9f8e6f5d-de4b-46bf-8d5b-4505c00a35fe-feedback');
  });
  it('should add correct attrs for feedback', () => {
    render(
      <GridItem {...npsPropsPage2} />,
    );

    const npsButton = screen.getByText('Submit');
    expect(npsButton).toHaveAttribute('data-pages');
    expect(npsButton).not.toHaveAttribute('data-destination');
    expect(npsButton).toHaveAttribute('data-close', 'true');
    expect(npsButton).toBeDisabled();
    expect(npsButton).not.toBeRequired();
    expect(npsButton).toHaveAttribute('data-currentpage', '1');
    expect(npsButton)
      .toHaveAttribute('data-key',
        '2ea759c5-c78a-47be-835a-77ccd4727fd5-nps-button');
  });
});
