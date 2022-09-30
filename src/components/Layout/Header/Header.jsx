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
const Header = () => {
  const LinkButton = ({ url = '/', title = 'Home' }) => {
    return (
      <Link to={url}>
        <Button variant={'ghost'}>{title}</Button>
      </Link>
    );
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = false;

  const logoutHandler = () => {
    console.log('logout');
  };

  const user = {
    role: 'admin',
  };
  return (
    <>
      <ColorModeSwitcher />
      <Button
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
              <LinkButton url="/" title="Home" />
              <LinkButton url="/courses" title="Browse All Courses" />
              <LinkButton url="/request" title="Request A Course" />
              <LinkButton url="/contact" title="Contact Us" />
              <LinkButton url="/about" title="About Us" />

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
                        <Link to="profile">
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
                        <Link to="/admin/dashboard">
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
                    <Link to="/login">
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>

                    <Link to="/register">
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
