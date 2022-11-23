import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  useDisclosure,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assests/images/cursor.png';
import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   deleteUser,
//   getAllUsers,
//   updateUserRole,
// } from '../../../redux/actions/admin';
// import toast from 'react-hot-toast';

const AdminCourses = () => {
  const courses = [
    {
      _id: 'dsdsdsd',
      title: 'React Course',
      category: 'Web Development',
      poster: {
        url: 'https://cdn.pixabay.com/photo/2015/09/17/17/25/code-944499_960_720.jpg',
      },
      createdBy: 'Sumanth Prabhu',
      views: 123,
      numOfVideos: 12,
    },
  ];
  // const { users, loading, error, message } = useSelector(state => state.admin);

  // const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const courseDetailsHandler = userId => {
    // dispatch(updateUserRole(userId));
    onOpen();
  };
  const deleteButtonHandler = userId => {
    // dispatch(deleteUser(userId));
  };

  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId, lectureId);
  };

  const addLectureHandler = (e, title, courseId, description, video) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch({ type: 'clearError' });
  //   }

  //   if (message) {
  //     toast.success(message);
  //     dispatch({ type: 'clearMessage' });
  //   }

  //   dispatch(getAllUsers());
  // }, [dispatch, error, message]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="Admin Courses"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creater</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses &&
                courses.map(item => (
                  <Row
                    courseDetailsHandler={courseDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                    //loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={'asasasas'}
          courseTitle="React Course"
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            // isLoading={loading}
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            // isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
