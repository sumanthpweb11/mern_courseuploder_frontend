import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useRadio,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfilePicture } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

import { fileUploadCss } from '../Auth/Register';

const Profile = ({ user }) => {
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

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('file', image);

    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

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
          <Avatar boxSize={'48'} src={user.avatar.url} />
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
              {user.subscription && user.subscription.status === 'active' ? (
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

      <ChangePhotoBox
        changeImage={changeImage}
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        image={image}
        setImage={setImage}
        ImagePrev={ImagePrev}
        setImagePrev={setImagePrev}
        modalCloseHandler={modalCloseHandler}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  Loading={loading}
                  w="full"
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
