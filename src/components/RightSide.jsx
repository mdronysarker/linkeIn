import React from "react";
import { styled } from "styled-components";

const RightSide = () => {
  return (
    <>
      <Container>
        <FollowCard>
          <Title>
            <h2>Add to your feed</h2>
            <img src="/images/feed-icon.svg " alt="alternative" />
          </Title>
          <FeedList>
            <li>
              <a>
                <Avatar />
              </a>
              <div>
                <span>#Linkin</span>
                <button>Follow</button>
              </div>
            </li>
            <li>
              <a>
                <Avatar />
              </a>
              <div>
                <span>#Vedio</span>
                <button>Follow</button>
              </div>
            </li>
          </FeedList>
          <Recommendation>
            View all recommendation
            <img src="/images/right-icon.svg" alt="" />
          </Recommendation>
        </FollowCard>
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb (0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;
  text-align: left;

  li {
    display: flex;
    flex-direction: column;
  }

  button {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    padding: 16px;
    align-items: center;
    border-radius: 15px;
    box-sizing: boder-box;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    max-height: 32px;
    max-width: 480px;
    text-align: center;
    outline: none;
    margin-left: 6px;

    &:last-child {
      margin-top: 11px;
      margin-bottom: 11px;
    }
  }
`;

const Avatar = styled.div`
  // background-image: url("https://static-expl.licdn.com/sc/h/1b4v1r54ijmrcmcyxzoidwxms);
  // background-size:contain;
  // background-repeat:no-repeat;
  // width:48px;
  // height:48px;
  // margin-right:8px;
  // background-position:center;
`;

const Recommendation = styled.div`
  display: flex;
  color: #0a66c2;
  align-items: center;
  font-size: 14px;
`;

export default RightSide;
