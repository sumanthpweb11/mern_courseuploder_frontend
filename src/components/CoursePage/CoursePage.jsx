import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
//import { getCourseLectures } from '../../redux/actions/course';
//import Loader from '../Layout/Loader/Loader';
import introVideo from '../../assests/videos/intro.mp4';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const lectures = [
    {
      _id: 'ffdfd',
      title: 'sample',
      description: 'sample descripotion asas',
      video: {
        url: 'asasas',
      },
    },

    {
      _id: 'ffdfd',
      title: 'sample',
      description: 'sample descripotion asas',
      video: {
        url: 'asasas',
      },
    },

    {
      _id: 'ffdfd',
      title: 'sample',
      description: 'sample descripotion asas',
      video: {
        url: 'asasas',
      },
    },

    {
      _id: 'ffdfd',
      title: 'sample',
      description: 'sample descripotion asas',
      video: {
        url: 'asasas',
      },
    },
  ];

  // const { lectures, loading } = useSelector(state => state.course);

  // const dispatch = useDispatch();
  const params = useParams();

  // useEffect(() => {
  //   dispatch(getCourseLectures(params.id));
  // }, [dispatch, params.id]);

  // if (
  //   user.role !== 'admin' &&
  //   (user.subscription === undefined || user.subscription.status !== 'active')
  // ) {
  //   return <Navigate to={'/subscribe'} />;
  // }

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          src={introVideo}
          width={'100%'}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>

        <Heading
          m="4"
          children={`#${lectureNumber + 1}  ${lectures[lectureNumber].title}  `}
        />

        <Text children="decription" />
        <Text m="4" children={lectures[lectureNumber].description} />
      </Box>

      <VStack>
        {lectures.map((item, index) => {
          return (
            <button
              onClick={() => setLectureNumber(index)}
              key={item._id}
              style={{
                width: '100%',
                padding: '1rem',
                textAlign: 'center',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
                margin: '0',
              }}
            >
              <Text noOfLines={1}>
                #{index + 1} {item.title}
              </Text>
            </button>
          );
        })}
      </VStack>
    </Grid>
  );
};
export default CoursePage;
