import { News } from '@/shared/types/models';

export interface UniversityData {
    news: News[];
}

export class MockUniversityProvider {
    private delayMs: number = 0;
    private simulateFailure: boolean = false;
    private cache: UniversityData | null = null;
    private refreshPromise: Promise<UniversityData> | null = null;

    private mockNews: News[] = [
        {
            id: '1',
            title: 'Kırklareli Üniversitesi Yeni Kayıt Kılavuzu Yayınlandı',
            date: '02 Haz 2026',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=600',
            location: 'Öğrenci İşleri',
            views: '1.2k',
            content: 'Üniversitemize yeni yerleşen öğrencilerimiz için hazırlanan kayıt kılavuzu yayınlanmıştır...'
        },
        {
            id: '2',
            title: 'Bahar Şenlikleri Programı Açıklandı',
            date: '15 May 2026',
            image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600',
            location: 'Kültür Merkezi',
            views: '2.5k',
            content: 'Bu yıl düzenlenecek olan Bahar Şenlikleri programı kapsamında birçok sanatçı ve grup üniversitemizde sahne alacak...'
        }
    ];

    setDelayMs(ms: number) {
        this.delayMs = ms;
    }

    setSimulateFailure(fail: boolean) {
        this.simulateFailure = fail;
    }

    refresh(): Promise<UniversityData> {
        // Reuse existing promise if multiple refreshes are called concurrently
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = (async () => {
            try {
                if (this.delayMs > 0) {
                    await new Promise<void>(resolve => setTimeout(() => resolve(), this.delayMs));
                }

                if (this.simulateFailure) {
                    // Fallback: If cache exists, return it instead of throwing
                    if (this.cache) {
                        return this.cache;
                    }
                    throw new Error('SIMULATED_PROVIDER_FAILURE');
                }

                const data: UniversityData = {
                    news: this.mockNews
                };

                this.cache = data;
                return data;
            } finally {
                this.refreshPromise = null;
            }
        })();

        return this.refreshPromise;
    }

    async getData(): Promise<UniversityData> {
        if (this.cache) {
            // SWR: Return cached data immediately and trigger background refresh
            this.refresh().catch(err => console.error('Background refresh failed', err));
            return this.cache;
        }

        // No cache: perform initial refresh
        return this.refresh();
    }
}

