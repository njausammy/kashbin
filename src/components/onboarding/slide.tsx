import React, { useRef, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Button, Text, VStack } from "@gluestack-ui/themed";
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view';


import Page from './Page';
import Dot from './Dot';
import LocalStorage from '@/src/utils/LocalStorage';

const Image1 = require('../../../assets/images/nyl-logo.png');
const Image2 = require('../../../assets/images/shop.png');
const Image3 = require('../../../assets/images/friends.png');

export interface PageInterface {
  title: string;
  WelcomeImg: any;
  top: number;
  indicatorTop: string
}

export interface PageControlRef {
  didSelectPage: (index: number) => void;
}

const deviceHeight = Dimensions.get('screen').height;

export const SLIDER_DATA: PageInterface[] = [
  {
    title: 'Karibu, pata points unaponunua bidhaa kwa duka!  ',
    WelcomeImg: Image1,
    top: 142,
    indicatorTop: '43%'
  },
  {
    title: 'Tumia points kununua bidhaa kwa duka!',
    WelcomeImg: Image2,
    top: 142,
    indicatorTop: '43%'
  },
  {
    title: 'Sambaza points na marafiki!',
    WelcomeImg: Image3,
    top: 142,
    indicatorTop: '43%'
  },
];

const { width, height } = Dimensions.get('screen');
const swiperHeight = (570 / 884) * height;
const topMargin = (50 / 884) * height;

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
      router.push('/auth/home');
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
              WelcomeImage={item.WelcomeImg}
              imageHeight={swiperHeight}
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
        backgroundColor="#DB1E36"
        borderRadius={50}
        paddingHorizontal={10}
        onPress={handleNext}
        marginTop={70}
        height={56}
        width={360}
        alignSelf="center"
      >

        <Text color='white'>Next</Text>
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
