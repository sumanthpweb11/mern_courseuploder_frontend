import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CourseCard from './CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import toast from 'react-hot-toast';
import { loadUser } from '../../redux/actions/user';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  const categories = [
    'web development',
    'AI',
    'Data Structure and Alorithims',
    'App development',
    'data science',
    'game development',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };
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
        {courses.length > 0 ? (
          courses.map(item => {
            return (
              <CourseCard
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imgSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            );
          })
        ) : (
          <Heading mt="4" children="Courses Not Found" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
