import { render, screen } from '@testing-library/react';
import Toggle from '../components/toggle/Toggle';
import { BrightnessHighFill, MoonStarsFill } from 'react-bootstrap-icons';

describe('Toggle', () => {
  test('Should have a "toggled" clasname if toggled', async () => {
    render(
      <Toggle
        initial={{ icon: <BrightnessHighFill /> }}
        end={{ icon: <MoonStarsFill /> }}
        defaultToggled={true}
        testid="toggle-theme"
      />,
    );
    expect((await screen.findByTestId('toggle-theme')).classList).not.toContain(
      'toggled',
    );
  });
});
