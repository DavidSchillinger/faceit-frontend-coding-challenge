import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';
import { useRootDispatch } from '../../store';
import { isValidTournamentName } from './isValidTournamentName';

jest.useFakeTimers();
jest.mock('../../store', () => {
  const dispatch = jest.fn();

  return {
    useRootDispatch: () => dispatch,
  };
});

jest.mock('./isValidTournamentName', () => ({
  isValidTournamentName: jest.fn(),
}));

const isValidTournamentNameSpy = isValidTournamentName as unknown as jest.Mock;

// This doesn't leak to other test files under Jest, does it?
(window as any).prompt = () => 'foobar';

describe('useToolbarActionHandlers', function () {
  const dispatch = useRootDispatch();

  const updateSearch = (value: string) => {
    fireEvent.change(screen.getByPlaceholderText('Search tournaments…'), {
      target: { value },
    });
  };

  const clickCreate = () => {
    fireEvent.click(screen.getByText('CREATE TOURNAMENT'));
  };

  it('should not cause any dispatch side-effects on mount', function () {
    render(<Toolbar />);
    expect(dispatch).not.toHaveBeenCalled();
  });

  // jest.mock("../../actions/tournaments") doesn't seem to work,
  // so I can't actually test that we're dispatching the correct events in the
  // following two test blocks. I'd want to ask for a second opinion here.

  it('should dispatch ~search update~ events on input changes', function () {
    render(<Toolbar />);
    updateSearch('foo');
    expect(dispatch).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(dispatch).toHaveBeenCalledTimes(1);

    updateSearch('bar');
    jest.advanceTimersByTime(200);
    expect(dispatch).toHaveBeenCalledTimes(2);

    updateSearch('foo');
    jest.advanceTimersByTime(100);
    updateSearch('bar');
    jest.advanceTimersByTime(100);
    expect(dispatch).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(100);
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should dispatch ~tournament create~ events on dialog submission', function () {
    // See parser tests in separate file.
    // See validator tests in separate file.

    isValidTournamentNameSpy.mockReturnValue(true);

    render(<Toolbar />);
    expect(dispatch).not.toHaveBeenCalled();

    clickCreate();
    expect(dispatch).toHaveBeenCalledTimes(1);

    clickCreate();
    expect(dispatch).toHaveBeenCalledTimes(2);

    isValidTournamentNameSpy.mockReturnValue(false);

    clickCreate();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
