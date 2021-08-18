import {  Button, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { firestore }  from "../../lib/firebase";

const VoteButtons = ({ post }) => {
  const [isVoting, setVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    // Fetch the previously voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse" and update the item on localStorage. Return "true" if the user has already voted the post.
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];

    try {
      // Parse the value of the item from localStorage. If the value of the
      // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }

    setVotedPosts(previousVotes);
  }, []);

  const handleDisablingOfVoting = (postId) => {
    // This function is responsible for disabling the voting button after a
    // user has voted. Fetch the previously voted items from localStorage. See
    // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
    // and update the item on localStorage.
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);

    // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
    localStorage.setItem("votes", JSON.stringify(votedPosts));
  };

  const handleClick = async (type) => {
    setVoting(true);

    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;

    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await firestore.collection("posts").doc(post.id).set({
      title: post.title,
      // scheme: post.scheme,
      major_premise: post.major_premise,
      minor_premise: post.minor_premise,
      conclusion: post.conclusion,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });

    // Disable the voting button once the voting is successful.
    handleDisablingOfVoting(post.id);

    setVoting(false);
  };

  const checkIfPostIsAlreadyVoted = () => {
    if (votedPosts.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
        <Col>
          <Button 
            variant="primary" 
            size="lg"
            aria-label="Upvote"
            onClick={() => handleClick("upvote")}
            disabled={isVoting || checkIfPostIsAlreadyVoted()}
            >
            <FiArrowUp />
          </Button>
            <h2>{post.upVotesCount}</h2>
        </Col>
        <Col>
          <Button 
            variant="warning" 
            size="lg"
            aria-label="Downvote"
            onClick={() => handleClick("downvote")}
            disabled={isVoting || checkIfPostIsAlreadyVoted()}
            >
            <FiArrowDown />
          </Button>
          <h2>{post.downVotesCount}</h2>
        </Col>
    </>
  );
};

export default VoteButtons;
