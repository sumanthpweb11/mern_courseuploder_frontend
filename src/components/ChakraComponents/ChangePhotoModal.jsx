import {
  Avatar,
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { fileUploadCss } from '../Auth/Register';

const ChangePhotoModal = ({
  changeImage,
  isOpen,
  onClose,
  changeImageSubmitHandler,
  image,
  setImage,
  ImagePrev,
  modalCloseHandler,
  setImagePrev,
  isloading,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={modalCloseHandler}>
        <ModalOverlay backdropFilter={'blur(10px)'} />
        <ModalContent>
          <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={e => changeImageSubmitHandler(e, image)}>
                <VStack spacing={'8'}>
                  {ImagePrev && <Avatar src={ImagePrev} boxSize={'48'} />}
                  <Input
                    type={'file'}
                    css={{ '&::file-selector-button': fileUploadCss }}
                    onChange={changeImage}
                  />

                  <Button isloading w={'full'} type="submit">
                    Change
                  </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={modalCloseHandler}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePhotoModal;
