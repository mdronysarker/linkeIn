import React, { useState } from "react";
import { styled } from "styled-components";
import { FaTelegramPlane } from "react-icons/fa";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const Comment = ({ postKey }) => {
  const [comment, setComment] = useState("");
  // console.log(postKey);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);

  const handleComment = () => {
    // console.log("hello");
    set(push(ref(db, "comment")), {
      comment: comment,
      name: user.displayName,
      id: postKey,
    }).then(() => {
      setComment("");
    });
  };

  return (
    <>
      <InputBox>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Write here..."
          // name={postKey}
        />
        <FaTelegramPlane onClick={handleComment} />
      </InputBox>
    </>
  );
};

const InputBox = styled.div`
  padding: 20px 0;
  position: relative;

  svg {
    position: absolute;
    top: 32px;
    right: 121px;
    width: 30px;
    height: 30px;
    color: #0a66c2;
  }

  input {
    width: 70%;
    height: 30px;
    padding: 10px 20px;
    border-radius: 10px;
    border-color: #0a66c2;
    font-size: 16px;
  }

  input:focus {
    outline: none !important;
  }
`;

export default Comment;
