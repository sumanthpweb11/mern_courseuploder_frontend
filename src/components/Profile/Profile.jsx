import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  useRadio,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ChangePhotoModal from '../ChakraComponents/ChangePhotoModal';

const Profile = () => {
  const user = {
    name: 'Sumanth',
    email: 'sumanthpweb11@gmial.com',
    createdAt: String(new Date().toISOString()),
    role: 'user',
    subscription: {
      status: undefined,
    },
    playlist: [
      {
        course: 'course id',
        poster:
          'https://cdn.pixabay.com/photo/2016/11/13/04/52/statistic-1820320_960_720.png',
      },
      {
        course: 'course id',
        poster:
          'https://cdn.pixabay.com/photo/2016/11/13/04/52/statistic-1820320_960_720.png',
      },
    ],
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');
  const [ImagePrev, setImagePrev] = useState('');

  const removeFromPlaylistHandler = id => {
    console.log(id);
  };

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const changeImageSubmitHandler = (e, image) => {
    e.preventDefault();
  };

  const modalCloseHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Container minH={'95vh'} maxW={'container.lg'} py="8">
      <Heading children="Profile" textTransform={'uppercase'} m="8" />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems="center"
        spacing={['8', '16']}
        p="8"
      >
        <VStack>
          <Avatar boxSize={'48'} />
          <Button onClick={onOpen} variant={'ghost'}>
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={'8'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>

          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>

          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription.status === 'active' ? (
                <Button>Cancel Subscription</Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'red'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={['column', 'row']} alignItems="center">
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Added Playlist " size={'md'} my="8" />

      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems="center"
          flexWrap={'wrap'}
          p="4"
        >
          {user.playlist.map(element => {
            return (
              <VStack w={'48'} m="2" key={element.course}>
                <Image
                  boxSize={'full'}
                  objectFit="contain"
                  src={element.poster}
                />

                <HStack>
                  <Link to={`/course/${element.course}`}>
                    <Button colorScheme={'yellow'} variant={'ghost'}>
                      Watch Now
                    </Button>
                  </Link>

                  <Button
                    borderRadius={'2'}
                    onClick={() => removeFromPlaylistHandler(element.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            );
          })}
        </Stack>
      )}

      <ChangePhotoModal
        changeImage={changeImage}
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        image={image}
        setImage={setImage}
        ImagePrev={ImagePrev}
        setImagePrev={setImagePrev}
        modalCloseHandler={modalCloseHandler}
      />
    </Container>
  );
};

export default Profile;
