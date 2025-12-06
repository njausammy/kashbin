import React from 'react'
import { Box, VStack, Text, Heading } from '@gluestack-ui/themed'
import { Dimensions } from 'react-native'
import { SvgProps } from 'react-native-svg'

type PageProps = {
  imageKey: number | string
  title: string
  subtitle: string
  WelcomeImage: React.FC<SvgProps> // SVG Component
  imageHeight: number
  imageWidth: number
}


const deviceHeight = Dimensions.get('screen').height;

export const getHeight = (height: number) => {
  return (height / 884) * deviceHeight;
};

const Page = ({
  imageKey,
  title,
  subtitle,
  WelcomeImage,
  imageHeight,
  imageWidth
}: PageProps) => {
  const SvgComponent = WelcomeImage;

  return (
    <VStack>
      <Box
        height={250}
        alignItems="center"
        justifyContent="center"
      >
        <SvgComponent
          width={imageWidth}
          height={imageHeight}
        />
      </Box>
      <Box marginTop={getHeight(60)} paddingHorizontal={24}>
        <VStack space="sm" alignItems="center">
          <Heading
            textAlign="center"
            lineHeight={41}
            color={"#2A2A2A"}
            fontSize={30}
            fontWeight={700}
            fontFamily="$heading"
          >
            {title}
          </Heading>
          <Text
            textAlign="center"
            color="#5A5A5A"
            fontSize={16}
            fontWeight={400}
            lineHeight={24}
            paddingHorizontal={20}
          >
            {subtitle}
          </Text>
        </VStack>
      </Box>
    </VStack>
  )
}

export default Page
