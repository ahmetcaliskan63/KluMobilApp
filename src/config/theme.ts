/**
 * KLU Mobile App Theme Configuration
 * Kırklareli Üniversitesi Kurumsal Renk Paleti
 */

export const colors = {
  // Kurumsal Renkler
  primary: '#182958',      // KLU Ana Mavi
  primaryLight: '#2A3F7A', // Açık Mavi
  primaryDark: '#0F1B3C',  // Koyu Mavi
  
  secondary: '#4B6C9A',    // İkincil Mavi
  accent: '#E1E9F2',       // Vurgu Rengi
  
  // Temel Renkler
  background: '#FFFFFF',   // Beyaz Arka Plan
  surface: '#F8F9FA',      // Yüzey Rengi
  card: '#FFFFFF',         // Kart Arka Planı
  
  // Metin Renkleri
  text: '#1C1C1C',         // Ana Metin
  textSecondary: '#666666', // İkincil Metin
  textLight: '#999999',    // Açık Metin
  textOnPrimary: '#FFFFFF', // Primary üzerinde metin
  
  // Durum Renkleri
  success: '#4CAF50',      // Başarı
  warning: '#FF9800',      // Uyarı
  error: '#F44336',        // Hata
  info: '#2196F3',         // Bilgi
  
  // Kenarlık ve Ayırıcılar
  border: '#E0E0E0',       // Kenarlık
  divider: '#EEEEEE',      // Ayırıcı
  
  // Gölge
  shadow: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};

export type Theme = typeof theme;
