import React, { useEffect, useState } from "react";
import { Container, Spinner, Col } from "react-bootstrap";

import AddNewPost from "./AddNewPost";
import Post from "./Post";
import { firestore } from "../../lib/firebase";
import Header from "../navbar/Header";

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
            <Container 
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <>
            <Header />
            <Container 
            className="flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", maxWidth: "700px" }}
            >
                <AddNewPost xs={8}/>
                <Col xs={8} className="w-100">
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
                </Col>
            </Container>
        </>
    );
}
