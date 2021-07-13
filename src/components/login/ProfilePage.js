// https://chakra-templates.dev/page-sections/features
// https://chakra-templates.dev/components/cards
// https://blog.logrocket.com/user-authentication-firebase-react-apps/
import React from "react";
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    HStack,
    VStack,
    Image,
    Container,
    SimpleGrid,
    Icon,
  } from '@chakra-ui/react';
  import { BiPencil } from "react-icons/bi";

const IMAGE = `https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png`;

// Replace test data with posts from user
const userPosts = Array.apply(null, Array(8)).map(function (x, i) {
    return {
      id: i,
      title: 'Lorem ipsum dolor sit amet',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
    };
  });
  
const ProfilePage = () => {
  return (
        <Box p={4}>
            <Center py={12}>
                <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Box
                        rounded={'lg'}
                        mt={-12}
                        pos={'relative'}
                        height={'230px'}
                        _after={{
                            transition: 'all .3s ease',
                            content: '""',
                            w: 'full',
                            h: 'full',
                            pos: 'absolute',
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${IMAGE})`,
                            filter: 'blur(15px)',
                            zIndex: -1,
                        }}
                        _groupHover={{
                            _after: {
                            filter: 'blur(20px)',
                            },
                        }}>
                            <Image
                                rounded={'lg'}
                                height={230}
                                width={282}
                                objectFit={'cover'}
                                src={IMAGE}
                            />
                    </Box>
                    <Stack pt={10} align={'center'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Brand
                        </Text>
                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                            Nice Chair, pink
                        </Heading>
                        <Stack direction={'row'} align={'center'}>
                            <Text fontWeight={800} fontSize={'xl'}>
                                $57
                            </Text>
                            <Text textDecoration={'line-through'} color={'gray.600'}>
                                $199
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Center>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>This is the headline</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
                    {userPosts.map((post) => (
                    <HStack key={post.id} align={'top'}>
                        <Box color={'green.400'} px={2}>
                        <Icon as={BiPencil} />
                        </Box>
                        <VStack align={'start'}>
                        <Text fontWeight={600}>{post.title}</Text>
                        <Text color={'gray.600'}>{post.text}</Text>
                        </VStack>
                    </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    
    // <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
    //   <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
    //     <div
    //       style={{
    //         background:
    //             `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
    //         backgroundSize: "cover",
    //         height: "200px",
    //         width: "200px"
    //       }}
    //       className="border border-blue-300"
    //     ></div>
    //     <div className = "md:pl-4">
    //     <h2 className = "text-2xl font-semibold">Faruq</h2>
    //     <h3 className = "italic">faruq123@gmail.com</h3>
    //     </div>
    //   </div>
    //   <button className = "w-full py-3 bg-red-600 mt-4 text-white">Sign out</button>
    // </div>
  ); 
};
export default ProfilePage;