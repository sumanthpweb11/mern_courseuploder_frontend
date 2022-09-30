import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import CourseCard from './CourseCard';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState();
  const categories = [
    'web development',
    'AI',
    'Data Structure and Alorithims',
    'App development',
    'data science',
    'game development',
  ];

  const addToPlaylistHandler = () => {};
  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a Course..."
        type={'text'}
        focusBorderColor="yellow.500"
      />

      <HStack overflowX={'auto'} paddingY={'8'}>
        {categories.map((category, index) => {
          return (
            <Button
              key={index}
              onClick={() => setCategory(category)}
              minW={'60'}
            >
              <Text children={category} />
            </Button>
          );
        })}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <CourseCard
          title={'sample'}
          description={'sample'}
          views={23}
          imgSrc={
            'https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_960_720.jpg'
          }
          id={'sample'}
          creator={'sample boy'}
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
