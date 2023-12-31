import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsCalendarEvent } from "react-icons/bs";
import { HiPhotograph } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatThin } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { BsSend } from "react-icons/bs";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import PostModal from "./PostModal";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Middle = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [storePost, setStorePost] = useState([]);
  const [storeComment, setStoreComment] = useState([]);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);

  const handleClick = () => {
    showModal === false ? setShowModal(true) : setShowModal(false);
  };

  const handleShowComment = () => {
    showComment === false ? setShowComment(true) : setShowComment(false);
  };

  // Read post

  useEffect(() => {
    const starCountRef = ref(db, "post");
    onValue(starCountRef, (snapshot) => {
      const singlePost = [];
      snapshot.forEach((item) => {
        // console.log(item);
        // console.log(item.key);
        if (user.uid === item.val().whoPostId) {
          singlePost.push(item);
        }
      });
      setStorePost(singlePost);
    });
  }, [db, user.uid]);

  // Read Comment

  useEffect(() => {
    const starCountRef = ref(db, "comment");
    onValue(starCountRef, (snapshot) => {
      const commentPost = [];
      snapshot.forEach((item) => {
        // console.log(item.key);
        commentPost.push(item);
      });
      setStoreComment(commentPost);
    });
  }, [db, user.uid]);

  // console.log(storeComment);

  // console.log(storePost);

  return (
    <>
      <Container>
        <ShareBox>
          share
          <div>
            <img src={user.photoURL || "./images/user.svg"} alt="" />
            <button onClick={handleClick}>Start a post</button>
          </div>
          <div>
            <button>
              <HiPhotograph />
              <span>Photo</span>
            </button>
            <button>
              <BsFillPlayBtnFill />
              <span>Vedio</span>
            </button>
            <button>
              <BsCalendarEvent />
              <span>Events</span>
            </button>
            <button>
              <BsCalendarEvent />
              <span>Write Articale</span>
            </button>
          </div>
        </ShareBox>
        <div>
          {storePost.map((items, i) => {
            const item = items.val();
            // console.log(item);
            const postKey = items.key;
            return (
              <Articale key={i}>
                <ShareActor>
                  <a>
                    <img
                      src={item.image || "/images/user.svg"}
                      alt="alternative"
                    />
                    <div>
                      <span>{item.title}</span>
                      <span>{item.info}</span>
                      <span>{item.date}</span>
                    </div>
                  </a>
                  <button>
                    <BsThreeDots />
                  </button>
                </ShareActor>
                <Description>{item.description}</Description>
                <ShareImg>
                  <a>
                    <img src={item.shareImage} alt="alternative" />
                  </a>
                </ShareImg>
                <SocialCounts>
                  <li>
                    <button>
                      <AiOutlineLike />
                      <FcLike />
                      <span>71</span>
                    </button>
                  </li>
                  <li>
                    <a>2 comments</a>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button>
                    <AiOutlineLike />
                    <span>Like</span>
                  </button>
                  <button onClick={handleShowComment}>
                    <FaRegComment />
                    <span>Comment</span>
                  </button>
                  <button>
                    <PiShareFatThin />
                    <span>Share</span>
                  </button>
                  <button>
                    <BsSend />
                    <span>Send</span>
                  </button>
                </SocialActions>
                {storeComment.map((com, i) => {
                  const commnet = com.val();
                  // const commentKey = com.key;
                  // console.log(postKey);
                  // console.log(commentKey);

                  return (
                    <div key={i}>
                      {postKey === commnet.id && (
                        <div>
                          <h3>{commnet.name}</h3>
                          <p>{commnet.comment}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
                {showComment && <Comment postKey={postKey} />}
              </Articale>
            );
          })}
        </div>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hiden;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  diplay: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;

      svg {
        font-size: 24px;
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        svg {
          margin: 0 4px 0 -2px;
        }

        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Articale = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  overflow-y: auto;
`;

const ShareActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    backgrouund: transparent;
    border: none;
    outline: none;
    margin-top: 8px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const ShareImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;

    svg {
      color: #0a66c2;
      font-size: 25px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export default Middle;
