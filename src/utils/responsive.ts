import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device (iPhone 8/X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scaled size based on screen width.
 * Useful for horizontal dimensions, padding, margins.
 */
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * Scaled size based on screen height.
 * Useful for vertical dimensions, heights.
 */
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

/**
 * Scaled size with a factor to prevent extreme scaling on very large/small screens.
 * Best for font sizes and small layouts.
 */
export const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

/**
 * Responsive screen dimensions
 */
export const viewport = {
    width,
    height,
    isSmallDevice: width < 375,
    isLargeDevice: width >= 768, // iPad/Tablets
};
