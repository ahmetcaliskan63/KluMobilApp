import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useAsyncResource } from '../useAsyncResource';

describe('useAsyncResource Stability Edge-Cases', () => {
    // 1) Unmount Safety
    it('should not update state after unmount', async () => {
        let resolvePromise: (value: any) => void;
        const loader = jest.fn(() => new Promise((resolve) => {
            resolvePromise = resolve;
        }));

        const { result, unmount } = renderHook(() => useAsyncResource(loader));

        // Initial state is loading
        expect(result.current.state.status).toBe('loading');

        // Unmount before resolve
        unmount();

        // Resolve the promise
        await act(async () => {
            resolvePromise!({ data: 'some result' });
        });

        // Hook is unmounted, state shouldn't have changed from its last known value
        // The main point is no crash or warning.
        expect(result.current.state.status).toBe('loading');
    });

    // 2) Refresh Spam (Race Protection)
    it('should only update state with the last request when multiple refreshes occur', async () => {
        let resolveRequest1: (value: any) => void;
        let resolveRequest2: (value: any) => void;

        // Note: First call is automatic on mount
        const loader = jest.fn()
            .mockImplementationOnce(() => new Promise(resolve => { resolveRequest1 = resolve; })) // auto load
            .mockImplementationOnce(() => new Promise(resolve => { resolveRequest2 = resolve; })); // manual refresh

        const { result } = renderHook(() => useAsyncResource(loader));

        // Wait for first call to be in flight
        await waitFor(() => expect(loader).toHaveBeenCalledTimes(1));

        // Start a refresh immediately while first is still pending
        await act(async () => {
            result.current.refresh();
        });

        await waitFor(() => expect(loader).toHaveBeenCalledTimes(2));

        // Now resolve the SECOND request (the manual refresh) FIRST
        await act(async () => {
            resolveRequest2!({ id: 2, data: 'latest' });
        });

        await waitFor(() => {
            expect(result.current.state.data).toEqual({ id: 2, data: 'latest' });
            expect(result.current.state.status).toBe('ready');
        });

        // Now resolve the FIRST request (the stale one)
        await act(async () => {
            resolveRequest1!({ id: 1, data: 'stale' });
        });

        // Give it a chance to breathe
        await act(async () => {
            await new Promise<void>(resolve => setTimeout(() => resolve(), 50));
        });

        // State SHOULD STILL BE latest
        expect(result.current.state.data).toEqual({ id: 2, data: 'latest' });
    });

    // 3) Cache + Failure (SWR Failure)
    it('should keep data visible and remain in "ready" state if refresh fails after initial success', async () => {
        const successData = { id: 1, title: 'Success' };

        // Setup: Success then failure
        const loader = jest.fn()
            .mockResolvedValueOnce(successData) // Initial load
            .mockRejectedValueOnce(new Error('RETRY_FAILURE')); // Refresh fails

        const { result } = renderHook(() => useAsyncResource(loader));

        // Wait for initial load to finish
        await waitFor(() => expect(result.current.state.status).toBe('ready'));
        expect(result.current.state.data).toEqual(successData);

        // Trigger refresh that will fail
        await act(async () => {
            result.current.refresh();
        });

        // SWR Rule: Data stays, status stays ready, error is set
        await waitFor(() => {
            expect(result.current.state.status).toBe('ready');
            expect(result.current.state.data).toEqual(successData);
            expect(result.current.state.error).toBeDefined();
        });
    });

    // 4) Empty Data Handling
    it('should transition to "empty" status if provider returns empty array', async () => {
        const loader = jest.fn().mockResolvedValue([]); // Empty array
        const options = { isEmpty: (data: any[]) => data.length === 0 };

        const { result } = renderHook(() => useAsyncResource(loader, options));

        await waitFor(() => {
            expect(result.current.state.status).toBe('empty');
            expect(result.current.state.data).toEqual([]);
        });
    });

    it('should transition to "empty" status if provider returns null', async () => {
        const loader = jest.fn().mockResolvedValue(null);

        const { result } = renderHook(() => useAsyncResource(loader));

        await waitFor(() => {
            expect(result.current.state.status).toBe('empty');
            expect(result.current.state.data).toBeNull();
        }, { timeout: 2000 });
    });
});

