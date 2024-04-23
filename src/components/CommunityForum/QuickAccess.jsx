import React from 'react';
import styled from 'styled-components';
import { FaRedditAlien, FaPlaystation, FaApple, FaBasketballBall, FaXbox } from 'react-icons/fa';

const CommunityList = styled.div`
  // background-color: #000;
  color: #fff;
  padding: 10px;
  width: 25%;
  font-family: Arial, sans-serif;
  padding-left:20px;
  margin-top: 5px;
  margin-left:10px;
  border-top-left-radius:20px ;
  border-left:1px solid gray;
`;

const CommunityHeader = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  margin-bottom:30px;
`;

const CommunityItem = styled.div`
  display: flex;
  align-items: center;
  margin:10px 0px 10px 0px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const CommunityIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const CommunityName = styled.span`
  flex-grow: 1;
`;

const CommunityMembers = styled.span`
  font-size: 12px;
`;

const QuickAccess = () => {
  const communities = [
    {
      name: 'r/AskMen',
      members: 6020012,
      icon: <FaRedditAlien />,
    },
    {
      name: 'r/PS4',
      members: 5581398,
      icon: <FaPlaystation />,
    },
    {
      name: 'r/apple',
      members: 4901994,
      icon: <FaApple />,
    },
    {
      name: 'r/NBA2k',
      members: 541626,
      icon: <FaBasketballBall />,
    },
    {
      name: 'r/xboxone',
      members: 4003255,
      icon: <FaXbox />,
    },
  ];

  return (
    <CommunityList className='quick-access'>
      <CommunityHeader>POPULAR COMMUNITIES</CommunityHeader>
      {communities.map((community, index) => (
        <CommunityItem key={index}>
          <CommunityIcon>{community.icon}</CommunityIcon>
          <CommunityName>{community.name}</CommunityName>
          <CommunityMembers>{community.members.toLocaleString()} members</CommunityMembers>
        </CommunityItem>
      ))}
      {/* <CommunityItem>See more</CommunityItem> */}
    </CommunityList>
  );
};

export default QuickAccess;


// import "/src/styles/quickaccess.css"
// function QuickAccess(){
//   return(
//     <div id="quick-access-container">
//       <div id="quick-access-wrapper">
//         <h1>Quick Access</h1>
//       </div>
//     </div>
//   )
// }
// export default QuickAccess;