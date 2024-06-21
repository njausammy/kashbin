import React from 'react'
import { Box, VStack, Text, Heading, Image, StatusBar } from '@gluestack-ui/themed'
import { Dimensions } from 'react-native'
type PageProps = {
  imageKey: number | string
  title: string
  WelcomeImage: any
  imageHeight: number
}

const { width, height } = Dimensions.get('screen')

const headerSectionHeight = (120 / 884) * height
const deviceHeight = Dimensions.get('screen').height;

export const getHeight = (height: number) => {
  return (height / 884) * deviceHeight;
};

const Page = ({
  imageKey,
  title,
  WelcomeImage,
  imageHeight,
  
}: PageProps) => {
  return (
    <VStack>

      <Box
      >
        <Image
          source={WelcomeImage}
          alt="Welcome Image"
          width={305}
          height={263}
          marginTop={imageKey == 2 ? getHeight(4) : 0}
          alignSelf='center'

        />
      </Box>
      <Box marginTop={getHeight(60)} paddingHorizontal={24}>
        <Heading
          textAlign="center"
          lineHeight={41}
          color={"#2A2A2A"}
          fontSize={34}
          fontWeight={600}
          fontFamily="$heading"
          padding={30}
        >

          {title}
        </Heading>
      </Box>
    </VStack>
  )
}

export default Page
