import React from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import vg from '../../assests/images/bg.png';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import introVideo from '../../assests/videos/intro.mp4';

const Home = () => {
  return (
    <section className="home">
      <Grid
        minH={'90vh'}
        templateColumns={['1fr', '3fr 1fr']}
        justifyContent={['center', 'space-evenly']}
        alignItems="center"
        spacing={['15', '56']}
        p={'8'}
      >
        {/* <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        > */}
        <VStack
          width={'full'}
          alignItems={['center', 'flex-start']}
          spacing="8"
        >
          <Heading
            children="LEARN FROM THE EXPERTS"
            size={'2xl'}
            className="text-font"
          />
          <Text
            fontSize={'2xl'}
            fontFamily="cursive"
            textAlign={['center', 'left']}
            children="Find Valuable Content At Reasonable Price"
          />
          <Link to="/courses">
            <Button size={'lg'}>Explore Now</Button>
          </Link>
        </VStack>

        <HStack alignItems={'center'} justifyContent="center">
          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit="contain"
          />
        </HStack>

        {/* </Stack> */}
      </Grid>

      <Box padding={'8'} bg="blackAlpha.800">
        <Heading
          textAlign={'center'}
          fontFamily="body"
          color={'yellow.400'}
          children="OUR BRANDS"
        />
        <HStack
          className="brandsBanner"
          justifyContent={'space-evenly'}
          marginTop="4"
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>
      </div>
    </section>
  );
};

export default Home;
