import { useCallback } from 'react';
import tr from '../locales/tr.json';
import en from '../locales/en.json';

// Simple translation hook for KLU Mobile
// In a real multi-language app, we would use a context to track the current language
export const useTranslation = () => {
  // Mocking language for now - would normally come from a store or device settings
  const locale = 'tr'; 
  const translations = locale === 'tr' ? tr : en;

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  }, [translations]);

  return { t, locale };
};
