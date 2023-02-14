import {
  Text,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  Link,
  Input,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";

const Payment = () => {
  const navigation = useNavigation();
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Your Wallet
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Top up Your Wallet here!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Amount</FormControl.Label>
            <Input type="number" placeholder="Enter your Amount here" />
          </FormControl>

          <Button
            mt="2"
            colorScheme="green"
            onPress={() => navigation.navigate("Xendit")}
          >
            Submit
          </Button>
          <HStack mt="6" justifyContent="center"></HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Payment;
