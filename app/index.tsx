import { VStack, Text, Image, Heading, Pressable } from '@gluestack-ui/themed';

export default function Index() {
    return (
        <VStack
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Image
                alt='welcome image'
                size="xl"
                source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/5caa/4df6/4cb3e70ba0078b453b647c8718858a57?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qlTlOHiRzZb0OytGf-eOkXoArYwK1Fb3iS-QZnMIUMjRGM4Ru355wJK1nDoJkWemyphYpi8tPfOI3aTe2NlvgHbhP3ORgWE~z5i1iRZ4~qFtCdT8uhsJSRIqVsdfnYhHwyrlMNHJYFQDqqdJ7zGHZoV9sxPRi4n0SRW6twaOH4799NhIyvjvTJwI8mRmu9ptTUyfLMyr5AqyIk5aZ466retT3pbFXLs-0EXTwdk3C1W4oVGX3tDl-q8RGZh0bbZOxD7Y499kZMaebE9FszaL9Sz0Mj1CatiY-MjaWQJB0tqThqPXK4zdTswjQsMAVFv3VeYJkjdE-HaMliOU1kdxRQ__',
                }}
                width={300}
                height={200}
            />

            <Heading>Karibu, pata points unaponunua bidhaa kwa duka</Heading>
            <Pressable
                onPress={() => console.log("Hello")}
                p="$5"
                bg="$primary500"
                $hover-bg="$primary400"
            >
                <Text color="white">Next</Text>
            </Pressable>
        </VStack>
    );
}
