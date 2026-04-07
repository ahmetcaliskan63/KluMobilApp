
import { moderateScale } from '@/shared/utils/responsive';

export const colors = {
  primary: '#182958',
  primaryLight: '#2A3F7A',
  primaryDark: '#0F1B3C',

  secondary: '#4B6C9A',
  accent: '#E1E9F2',

  background: '#FFFFFF',
  surface: '#F8F9FA',
  card: '#FFFFFF',
  text: '#1C1C1C',
  textSecondary: '#666666',
  textLight: '#999999',
  textOnPrimary: '#FFFFFF',

  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  border: '#E0E0E0',
  divider: '#EEEEEE',
  shadow: '#000000',
};

export const darkColors = {
  primary: '#182958',
  primaryLight: '#2A3F7A',
  primaryDark: '#0F1B3C',

  secondary: '#6C8DBE',
  accent: '#1E293B',

  background: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',

  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textLight: '#64748B',
  textOnPrimary: '#FFFFFF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  border: '#334155',
  divider: '#1E293B',

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

