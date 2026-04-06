import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { StateView } from '../StateView';
import { AsyncState } from '../../../types/asyncState';

// Mock useAppTheme
jest.mock('../../../hooks/useAppTheme', () => ({
    useAppTheme: () => ({
        theme: {
            colors: {
                primary: '#000',
                error: '#f00',
                background: '#fff',
                text: '#000',
                textSecondary: '#666',
            },
            typography: {
                h3: {},
                body: {},
                caption: {},
            },
            shadows: {
                small: {},
            },
        },
    }),
}));

// Mock Ionicons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('StateView', () => {
    const mockOnRetry = jest.fn();

    const readyState: AsyncState<any> = {
        status: 'ready',
        data: { test: 'data' },
        error: undefined,
    };

    const loadingState: AsyncState<any> = {
        status: 'loading',
        data: null,
        error: undefined,
    };

    const emptyState: AsyncState<any> = {
        status: 'empty',
        data: null,
        error: undefined,
    };

    const errorState: AsyncState<any> = {
        status: 'error',
        data: null,
        error: 'Simulated Error',
    };

    it('renders children when status is ready', () => {
        const { getByText } = render(
            <StateView state={readyState}>
                <Text>Ready Content</Text>
            </StateView>
        );

        expect(getByText('Ready Content')).toBeTruthy();
    });

    it('renders ActivityIndicator when status is loading and no data', () => {
        const { queryByText } = render(
            <StateView state={loadingState}>
                <Text>Children</Text>
            </StateView>
        );

        // ActivityIndicator doesn't have a default testID, so we check if children are NOT rendered
        const children = render(
            <StateView state={loadingState}>
                <Text>Ready Content</Text>
            </StateView>
        ).queryByText('Ready Content');

        expect(children).toBeNull();
    });

    it('renders empty title and message when status is empty', () => {
        const { getByText } = render(
            <StateView state={emptyState} emptyTitle="Custom Empty" emptyMessage="No items found">
                <Text>Children</Text>
            </StateView>
        );

        expect(getByText('Custom Empty')).toBeTruthy();
        expect(getByText('No items found')).toBeTruthy();
    });

    it('renders error title and message when status is error and no data', () => {
        const { getByText } = render(
            <StateView state={errorState} errorTitle="Custom Error Title">
                <Text>Children</Text>
            </StateView>
        );

        expect(getByText('Custom Error Title')).toBeTruthy();
        expect(getByText('Simulated Error')).toBeTruthy();
    });

    it('calls onRetry when retry button is pressed in error state', () => {
        const { getByText } = render(
            <StateView state={errorState} onRetry={mockOnRetry}>
                <Text>Children</Text>
            </StateView>
        );

        fireEvent.press(getByText('Tekrar Dene'));
        expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('renders error banner when status is ready but contains an error (SWR failure)', () => {
        const swrErrorState: AsyncState<any> = {
            status: 'ready',
            data: { some: 'cached data' },
            error: 'Background Refresh Failed',
        };

        const { getByText } = render(
            <StateView state={swrErrorState}>
                <Text>Visible Content</Text>
            </StateView>
        );

        expect(getByText('Visible Content')).toBeTruthy();
        expect(getByText('Background Refresh Failed')).toBeTruthy();
    });
});

