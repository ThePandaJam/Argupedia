// https://chakra-templates.dev/page-sections/features
// https://chakra-templates.dev/components/cards
// https://blog.logrocket.com/user-authentication-firebase-react-apps/
import React , { useContext, useState } from "react";
import { Container, Card , Button, Row, Col, Tabs, Tab, Alert } from 'react-bootstrap'
import { BiLogOut, BiPencil } from "react-icons/bi";
import { GrGraphQl, GrStatusGood } from "react-icons/gr";
import { Link, useHistory } from 'react-router-dom';

import { UserContext } from "../../providers/UserProvider";
import {auth} from "../../lib/firebase";

const IMAGE = `http://detecta.com.br/admin/custom_img/unknown-user.png`;

// Replace test data with posts from user
const userPosts = Array.apply(null, Array(8)).map(function (x, i) {
    return {
      id: i,
      title: 'My Post',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
    };
  });

  // Replace test data with arguments from user
const userArgs = Array.apply(null, Array(8)).map(function (x, i) {
    return {
        id: i,
        title: 'My Argument',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
    };
});
  
const ProfilePage = () => {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;

    const [error, setError] = useState("")
    const history = useHistory

    async function handleLogout(){
        setError('')
    
        try {
          await auth.signOut()
          //TODO: change to homepage for a user not signed in
          history.push("/login")
    
        } catch {
          setError("Failed to log out")
        }
    
      }

    return (
        <>
        <Container>
            <div className="w-100">
                <Row className="gutters-sm">
                    <Col className="col-md-4 mb-3">
                        <Card>
                            <Card.Body>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={photoURL || IMAGE} alt="User Image" className="rounded-circle" width="150"/>
                                    <div className="mt-3">
                                        <h4>{displayName}</h4>
                                        <p className="text-secondary mb-2">{email}</p>
                                        <Button variant="primary" onClick={handleLogout}><BiLogOut fill="white"/>Log out</Button>
                                        {error && <Alert variant="danger">{error}</Alert>}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="md-8" style={{ minWidth: "600px" }}>
                        {/* tabs */}
                        <Tabs defaultActiveKey="posts" className="w-100">
                            <Tab eventKey="posts" title="Posts">
                                <Row className=" gutters-sm">
                                {userPosts.map((post) => (
                                        <Card key={post.id}>
                                            <Card.Body>
                                            <Card.Title><GrGraphQl/>{post.title}</Card.Title>
                                            <Card.Text>{post.text}</Card.Text> 
                                            </Card.Body>
                                        </Card>
                                ))}
                                </Row>
                            </Tab>
                            <Tab eventKey="arguments" title="Arguments">
                                <Row className=" gutters-sm">
                                {userArgs.map((argument) => (
                                        <Card key={argument.id}>
                                            <Card.Body>
                                            <Card.Title><GrStatusGood/>{argument.title}</Card.Title>
                                            <Card.Text>{argument.text}</Card.Text> 
                                            </Card.Body>
                                        </Card>
                                ))}
                                </Row>
                            </Tab>
                        </Tabs>
                        
                    </Col>
                </Row>
            </div>
        </Container>
    </>
    
    ); 
};
export default ProfilePage;