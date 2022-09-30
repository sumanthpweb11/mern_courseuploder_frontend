import {
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const CourseCard = ({
  views,
  title,
  imgSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imgSrc} boxSize="60" objectFit={'contain'} mt="2" />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        noOfLines={3}
        children={title}
        size="sm"
      />
      <Text children={description} noOfLines={2} />

      <HStack>
        <Text
          children={'Creator'}
          textTransform="uppercase"
          fontWeight={'bold'}
        />
        <Text
          children={creator}
          fontFamily={'body'}
          textTransform="uppercase"
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lectures -  ${lectureCount}`}
        textTransform="uppercase"
      />

      <Heading
        size="xs"
        children={`Views -  ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={['center', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>

        <Button
          onClick={() => addToPlaylistHandler(id)}
          variant={'ghost'}
          colorScheme={'yellow'}
        >
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

export default CourseCard;
