import { Box, Center, Text, VStack } from "@chakra-ui/react";
import "./App.css";
import Particles from "react-particles";
import { Container, Engine } from "tsparticles-engine";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";

function App() {
  const gradientStyle = {
    background: "linear-gradient(to bottom, #1E0534, #011013)",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <Box style={gradientStyle} w="100vw" h="100vh">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 40,
              },
              repulse: {
                distance: 100,
                duration: 0.2,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Center w="100%" h="100%">
        <VStack marginBottom="15%">
          <Text
            m="0"
            noOfLines={2}
            fontWeight="bold"
            fontSize="8vw"
            color="white"
          >
            Tripploy
          </Text>
          {/* <Text fontSize="1vw" color="white">
            Your all travel inquiry ends here.
          </Text> */}
          <Text fontWeight="bold" color="white">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - -
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
