import React, { useEffect, useState } from "react";
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";

import { Router } from "@reach/router";
import AddNewPost from "./AddNewPost";
import NavBar from "./navbar/Header";
import Post from "./post";
import { firestore } from "../lib/firebase";
import Header from "./navbar/Header";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Hook to handle the initial fetching of posts

        firestore.collection("posts")
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            setPosts(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        // Hook to handle the real-time updating of posts whenever there is a
        // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)

        firestore.collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
            const _posts = [];

            querySnapshot.forEach((doc) => {
            _posts.push({
                id: doc.id,
                ...doc.data(),
            });
            });

            setPosts(_posts);
        });
    }, []);

    if (isLoading) {
        return (
        <Flex minH="100vh" justifyContent="center" alignItems="center">
            <Spinner />
        </Flex>
        );
    }

    return (
        <>
        <Header />
        <Container maxW="md" centerContent p={8}>
            <AddNewPost spacing={8}/>
            <VStack spacing={8} w="100%">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
            </VStack>
        </Container>
        </>
    );
}