/**
 * KLU Mobile App Theme Configuration
 * Kırklareli Üniversitesi Kurumsal Renk Paleti
 */
import { moderateScale, scale, verticalScale } from '../utils/responsive';

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

export const darkColors = {
  // Kurumsal Renkler (Karanlık Modda da korunur ancak bazıları yumuşatılabilir)
  primary: '#182958',      // KLU Ana Mavi
  primaryLight: '#2A3F7A',
  primaryDark: '#0F1B3C',

  secondary: '#6C8DBE',    // Daha açık mavi toner
  accent: '#1E293B',       // Koyu Vurgu

  // Temel Renkler
  background: '#0F172A',   // Koyu Lacivert Arka Plan
  surface: '#1E293B',      // Panel Rengi
  card: '#1E293B',         // Kart Rengi

  // Metin Renkleri
  text: '#F8FAFC',         // Açık Metin
  textSecondary: '#94A3B8', // İkincil Metin
  textLight: '#64748B',    // Daha sönük metin
  textOnPrimary: '#FFFFFF',

  // Durum Renkleri
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Kenarlık ve Ayırıcılar
  border: '#334155',
  divider: '#1E293B',

  // Gölge
  shadow: '#000000',
};

export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
};

export const borderRadius = {
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(16),
  full: 999,
};

export const typography = {
  h1: {
    fontSize: moderateScale(32),
    fontWeight: '700' as const,
    lineHeight: moderateScale(40),
  },
  h2: {
    fontSize: moderateScale(24),
    fontWeight: '700' as const,
    lineHeight: moderateScale(32),
  },
  h3: {
    fontSize: moderateScale(20),
    fontWeight: '600' as const,
    lineHeight: moderateScale(28),
  },
  h4: {
    fontSize: moderateScale(18),
    fontWeight: '600' as const,
    lineHeight: moderateScale(24),
  },
  body: {
    fontSize: moderateScale(16),
    fontWeight: '400' as const,
    lineHeight: moderateScale(24),
  },
  bodyMedium: {
    fontSize: moderateScale(16),
    fontWeight: '500' as const,
    lineHeight: moderateScale(24),
  },
  caption: {
    fontSize: moderateScale(14),
    fontWeight: '400' as const,
    lineHeight: moderateScale(20),
  },
  small: {
    fontSize: moderateScale(12),
    fontWeight: '400' as const,
    lineHeight: moderateScale(16),
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
  none: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
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
