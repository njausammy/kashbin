import React, { useRef, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Text, VStack } from "@gluestack-ui/themed";
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';
import { SvgProps } from 'react-native-svg';
import Button from '@/src/components/form/AnimatedButton';

import Page from './Page';
import Dot from './Dot';
import LocalStorage from '@/src/utils/LocalStorage';

// Updated onboarding images with Deep Blue + Gold branding (SVG Components)
import SendIcon from '../../../assets/images/onboarding-send.svg';
import CashInIcon from '../../../assets/images/onboarding-cashin.svg';
import MerchantsIcon from '../../../assets/images/onboarding-merchants.svg';

export interface PageInterface {
  title: string;
  subtitle: string;
  WelcomeImg: React.FC<SvgProps>; // SVG Component
  top: number;
  indicatorTop: string
  imageHeight: number
  imageWidth: number
}

export interface PageControlRef {
  didSelectPage: (index: number) => void;
}

const deviceHeight = Dimensions.get('screen').height;

export const SLIDER_DATA: PageInterface[] = [
  {
    title: 'Send Money Instantly',
    subtitle: 'Send USDT to anyone with just their phone number',
    WelcomeImg: SendIcon,
    top: 142,
    indicatorTop: '43%',
    imageHeight: 200,
    imageWidth: 330
  },
  {
    title: 'Cash In & Out Easily',
    subtitle: 'Buy crypto with M-Pesa, cash out anytime',
    WelcomeImg: CashInIcon,
    top: 142,
    indicatorTop: '43%',
    imageHeight: 200,
    imageWidth: 330
  },
  {
    title: 'Pay Merchants',
    subtitle: 'Pay at shops accepting crypto payments',
    WelcomeImg: MerchantsIcon,
    top: 142,
    indicatorTop: '43%',
    imageHeight: 200,
    imageWidth: 330
  },
];


export const getHeight = (height: number) => {
  return (height / 884) * deviceHeight;
};

const OnboardingSlide = () => {
  const initial = 0;
  const [currentPage, setCurrentPage] = useState(initial);
  const pageRef = useRef<PagerView>(null);
  const pageControlRef = useRef<PageControlRef>(null);

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setCurrentPage(e.nativeEvent.position);
    pageControlRef.current?.didSelectPage(e.nativeEvent.position);
  };


  const handleNext = async () => {
    if (currentPage === 2) {
      LocalStorage.setItem('hasOnboarded', 'onboard');
      router.push('/auth/phone');
    } else {
      pageRef.current?.setPage(currentPage + 1);
    }
  };


  return (
    <Box backgroundColor="$white" flex={1}>
      <Box top={142} height={getHeight(600)}>
        <PagerView
          style={styles.pagerView}
          initialPage={initial}
          ref={pageRef}
          onPageSelected={onPageSelected}

        >
          {SLIDER_DATA.map((item, index) => (
            <Page
              key={index.toString()}
              imageKey={index}
              title={item.title}
              subtitle={item.subtitle}
              WelcomeImage={item.WelcomeImg}
              imageHeight={item.imageHeight}
              imageWidth={item.imageWidth}
            />
          ))}
        </PagerView>
      </Box>

      <Box top={'50%'} alignSelf="center" position="absolute" mt={getHeight(30)}>
        <VStack alignSelf="center" flexDirection="row">
          {SLIDER_DATA.map((_, index) => (
            <Dot key={index.toString()} index={index} currentPage={currentPage} />
          ))}
        </VStack>
      </Box>

      <Button
        backgroundColor="#1E40AF"
        borderRadius={50}
        paddingHorizontal={10}
        onPress={handleNext}
        marginTop={70}
        height={56}
        width={360}
        alignSelf="center"
      >
        <Text color='white' fontSize={16} fontWeight={600}>
          {currentPage === 2 ? 'Get Started' : 'Next'}
        </Text>
      </Button>
    </Box>
  );
};

export default OnboardingSlide;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
