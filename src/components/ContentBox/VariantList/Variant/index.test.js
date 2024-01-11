import React from 'react';
import { render, screen } from '@testing-library/react';

import { WithTheme } from 'utils/testUtils';
import Variant from './index';

const componentProps = {
  error: false,
  index: 1,
  isActive: false,
  isEdit: false,
  name: 'Variant test',
  renameError: false,
  setActiveVariant: () => {},
  onRenameVariant: () => {},
  menuItems: [
    { title: 'Rename', onClick: () => {} },
    { title: 'Create copy', disabled: false, onClick: () => {} },
    { title: 'Remove', onClick: () => {} },
  ],
};

const Wrapper = (props) => (
  <WithTheme>
    <Variant {...props} />
  </WithTheme>
);
describe('Push test', () => {
  it('should render variant', () => {
    render(
      <Wrapper {...componentProps} />,
    );

    expect(screen.getByText('Variant test')).toBeInTheDocument();
  });
  it('should show error', () => {
    render(
      <Wrapper {...componentProps} error />,
    );

    expect(screen.getByTestId('variant-error')).toBeInTheDocument();
  });
});
