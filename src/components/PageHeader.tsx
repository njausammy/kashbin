import { Box, Progress, ProgressFilledTrack, Pressable, Text} from "@gluestack-ui/themed"
import { router } from "expo-router"
import { Ionicons } from '@expo/vector-icons';
const PageHeader = ({ value, hideProgressBar, ...others }: { value: number, hideProgressBar?: boolean}) => {

    return (
        <Box  justifyContent="flex-end" height={94} width="$full">

            <Pressable marginBottom={5} onPress={() => router.back()} width="$full" flexDirection="row" justifyContent="flex-start" alignItems="flex-start" >
                <Ionicons name="chevron-back-outline" size={24} color="#2A2A2A" />
                <Text>Back</Text>
            </Pressable>
            {!hideProgressBar && <Progress value={value} width="$full" height={4} size="md" backgroundColor='#F7F7F7' >
                <ProgressFilledTrack backgroundColor='#DB1E36' />
            </Progress>}
        </Box>
    )
}

export default PageHeader
