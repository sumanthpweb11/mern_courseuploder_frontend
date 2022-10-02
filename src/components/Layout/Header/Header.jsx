import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => {
  return (
    <Link onClick={onClose} to={url}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
};
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAuthenticated = true;

  const logoutHandler = () => {
    console.log('logout');
    onClose();
  };

  const user = {
    role: 'admin',
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
        zIndex={'overlay'}
        onClick={onOpen}
        width="12"
        height="12"
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request A Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About Us" />

              <HStack
                justifyContent="space-evenly"
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to="profile">
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            Profile
                          </Button>
                        </Link>

                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine style={{ margin: '4px' }} />
                          Logout
                        </Button>
                      </HStack>

                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button>
                            <RiDashboardFill style={{ margin: '4px' }} />{' '}
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>

                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={'yellow'}>SignUp</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
