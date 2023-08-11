import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { GrGallery } from "react-icons/gr";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { AiOutlineMessage } from "react-icons/ai";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [vedioLink, setVedioLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const user = useSelector((users) => users.login.loggedIn);
  const storage = getStorage();
  const db = getDatabase();

  const reset = () => {
    setEditorText("");
    props.handleClick();
    setShareImage(null);
    setVedioLink("");
    setAssetArea("");
  };

  const handleChnage = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}
      `);
      return;
    }
    setShareImage(image);
  };

  // console.log(shareImage);

  const swichAssetArea = (area) => {
    setShareImage(null);
    setVedioLink("");
    setAssetArea(area);
  };

  const handleSubmitPost = () => {
    if (!shareImage) {
      alert("Please select an image to share.");
      return;
    }

    const storageRef = sref(
      storage,
      `uploadPostImage/ ${user.uid} = ${user.uid} / ${uuidv4()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, shareImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "post")), {
            whoPostId: user.uid,
            title: user.displayName,
            info: user.email,
            date: `${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
            description: editorText,
            image: user.photoURL,
            shareImage: downloadURL,
            vedio: vedioLink,
          });
        });
      }
    );
  };

  return (
    <>
      {props.showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={reset}>
                <ImCross />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                <img
                  src={user.photoURL || "./images/user.svg"}
                  onError={(e) => {
                    e.target.src = "./images/user.svg";
                  }}
                  alt=""
                />
                <span>{user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="what do you wnat to talk about ?"
                  onFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/png , image/jpeg"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChnage}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="please input a video link"
                        onChange={(e) => setVedioLink(e.target.value)}
                      />
                      {vedioLink && (
                        <ReactPlayer url={vedioLink} width={"100%"} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AsseButton onClick={() => swichAssetArea("image")}>
                  <GrGallery />
                </AsseButton>
                <AsseButton onClick={() => swichAssetArea("media")}>
                  <PiYoutubeLogoLight />
                </AsseButton>
              </AttachAssets>
              <ShareComment>
                <AsseButton>
                  <AiOutlineMessage />
                  Anyone
                </AsseButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={handleSubmitPost}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: balck;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  display: flex;
  position: relative;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.1);
  }

  svg {
    pointer-events: none;
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AsseButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);

  svg {
    font-size: 23px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;

  ${AsseButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AsseButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: white;

  &:hover {
    background: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
