import { Box, Image } from "@gluestack-ui/themed";

const SplashScreen = () => {
    return (
        <Box flex={1}>

            <Image
                source={require('../../assets/images/splash.png')}
                alt="Splash Screen" 
                w="$full"
                h="$full"
                resizeMode="cover"
            />
        </Box>
    );
};

export default SplashScreen;
