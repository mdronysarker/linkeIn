import React from "react";
import { styled } from "styled-components";
import { FaTelegramPlane } from "react-icons/fa";

const Comment = () => {
  return (
    <>
      <InputBox>
        <input type="text" placeholder="Write here..." />
        <FaTelegramPlane />
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
