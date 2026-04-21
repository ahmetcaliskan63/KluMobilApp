import { MockUniversityProvider } from '@/features/university/data';

describe('MockUniversityProvider', () => {
    let provider: MockUniversityProvider;

    beforeEach(() => {
        provider = new MockUniversityProvider();
    });

    describe('Concurrency', () => {
        it('should reuse the same promise when multiple refreshes are called concurrently', async () => {
            provider.setDelayMs(10);
            const p1 = provider.refresh();
            const p2 = provider.refresh();

            expect(p1).toBe(p2);

            const [result1, result2] = await Promise.all([p1, p2]);
            expect(result1).toBe(result2);
            expect(result1.news.length).toBeGreaterThan(0);
        });
    });

    describe('SWR (Stale-While-Revalidate)', () => {
        it('should return cached data immediately if cache exists', async () => {
            // First load to fill cache
            provider.setDelayMs(0);
            await provider.refresh();

            // SWR check
            provider.setDelayMs(100);
            const start = Date.now();
            const data = await provider.getData();
            const duration = Date.now() - start;

            // Should resolve much faster than delayMs (basically instantly)
            expect(duration).toBeLessThan(50);
            expect(data.news.length).toBeGreaterThan(0);
        });

        it('should trigger a background refresh when getData is called with cache', async () => {
            provider.setDelayMs(0);
            await provider.refresh();

            // Set a delay for the background refresh
            provider.setDelayMs(20);

            // We need to spy on refresh or fetchFresh to verify background call
            const refreshSpy = jest.spyOn(provider, 'refresh');

            await provider.getData();

            // Background refresh is async and not awaited in getData
            // We wait a bit to ensure it's called
            await new Promise<void>(resolve => setTimeout(() => resolve(), 5));
            expect(refreshSpy).toHaveBeenCalled();

            refreshSpy.mockRestore();
        });
    });

    describe('Safe Fallback', () => {
        it('should return cached data instead of throwing when refresh fails after cache is warm', async () => {
            // Warm the cache
            provider.setDelayMs(0);
            await provider.refresh();

            // Simulate failure
            provider.setSimulateFailure(true);

            // This should NOT throw even though it fails internally
            const data = await provider.refresh();

            expect(data.news.length).toBeGreaterThan(0);
        });

        it('should throw if no cache exists and simulation fails', async () => {
            provider.setSimulateFailure(true);
            provider.setDelayMs(0);

            await expect(provider.refresh()).rejects.toThrow('SIMULATED_PROVIDER_FAILURE');
        });
    });
});

