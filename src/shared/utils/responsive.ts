import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
export const isSmallDevice = width < 375;

export const isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTV &&
        (height === 780 || height === 812 || height === 844 || height === 896 || height === 926 || height === 932)
    );
};

export const scale = (size: number) => {
    const newSize = (width / guidelineBaseWidth) * size;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const verticalScale = (size: number) => {
    const newSize = (height / guidelineBaseHeight) * size;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
export const moderateScale = (size: number, factor = 0.5) => {
    const newSize = size + (scale(size) - size) * factor;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const viewport = {
    width,
    height,
    isSmallDevice,
    isLargeDevice: width >= 768,
    isIphoneX: isIphoneX(),
    pixelRatio: PixelRatio.get(),
};

