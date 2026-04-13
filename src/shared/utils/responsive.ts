import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device (iPhone 8/X)
// These constants are the source of truth for all relative scaling
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Check if the device is a small screen (e.g. iPhone SE)
 */
export const isSmallDevice = width < 375;

/**
 * Check if the device has a notch (iPhone X and later)
 */
export const isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTV &&
        (height === 780 || height === 812 || height === 844 || height === 896 || height === 926 || height === 932)
    );
};

/**
 * Scaled size based on screen width.
 * Useful for horizontal dimensions, padding, margins.
 */
export const scale = (size: number) => {
    const newSize = (width / guidelineBaseWidth) * size;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Scaled size based on screen height.
 * Useful for vertical dimensions, heights.
 */
export const verticalScale = (size: number) => {
    const newSize = (height / guidelineBaseHeight) * size;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Scaled size with a factor to prevent extreme scaling on very large/small screens.
 * Best for font sizes and small layouts.
 */
export const moderateScale = (size: number, factor = 0.5) => {
    const newSize = size + (scale(size) - size) * factor;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Responsive screen dimensions and constants
 */
export const viewport = {
    width,
    height,
    isSmallDevice,
    isLargeDevice: width >= 768, // iPad/Tablets
    isIphoneX: isIphoneX(),
    pixelRatio: PixelRatio.get(),
};

