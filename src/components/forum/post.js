import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import VoteButtons from "./VoteButtons";

const Post = ({ post }) => {
  return (
    <Row key={post.id} className="w-100 mb-4" >
      <VoteButtons post={post} />
      <Col xs={9}>
        <Card className="h-400">
          <Card.Title>{post.title}</Card.Title>
        </Card>
      </Col>
      
    </Row>
  );
};

export default Post;
