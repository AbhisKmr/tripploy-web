import { Box, Center, Text, VStack } from "@chakra-ui/react";
import "./App.css";

function App() {
  const gradientStyle = {
    background: "linear-gradient(to bottom, #1E0534, #011013)",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  return (
    <Box style={gradientStyle} w="100vw" h="100vh">
      <Center w="100%" h="100%">
        <VStack marginBottom="15%">
          <Text m="0" noOfLines={2} fontWeight="bold" fontSize="8vw" color="white">
            Tripploy
          </Text>
          {/* <Text fontSize="1vw" color="white">
            Your all travel inquiry ends here.
          </Text> */}
          <Text fontWeight="bold" color="white">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
          </Text>
          <Text m="0" fontSize="3vw" color="white">
            We are releasing soon :)
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}

export default App;
