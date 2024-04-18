import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaArrowRight, FaGamepad, FaFootballBall, FaChartLine, FaSun, FaTv, FaStar } from 'react-icons/fa';
import { IoHelpCircle, IoNewspaperOutline, IoBriefcaseOutline, IoDocumentText } from 'react-icons/io5';
import { RiCommunityFill, RiRedditFill, RiAwardFill } from 'react-icons/ri';
// import "/src/styles/dashboard.css";
const SidebarContainer = styled.div`
  // background-color: #000;
  color: #fff;
  width: 25%;
  position: sticky;
  min-width: 210px;
  border-radius: 20px;
  padding: 10px;
  overflow-y: scroll;
  font-family: Arial, sans-serif;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const SidebarIcon = styled.span`
  margin-right: 10px;
`;

const SidebarLabel = styled.span`
  flex-grow: 1;
`;

const SidebarDivider = styled.hr`
  border: none;
  border-top: 1px solid #333;
  margin: 10px 0;
`;

const Dashboard = () => {
  const [showTopics, setShowTopics] = useState(false);
  const [showResources, setShowResources] = useState(false);

  // const toggleTopics = () => setShowTopics(!showTopics);
  // const toggleResources = () => setShowResources(!showResources);

  return (
    <SidebarContainer>
      {/* <div id="dashboard-wrapper"> */}
        
      <SidebarItem>
        <SidebarIcon>
          <FaHome />
        </SidebarIcon>
        <SidebarLabel>Home</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaArrowRight />
        </SidebarIcon>
        <SidebarLabel>Popular</SidebarLabel>
      </SidebarItem>
      <SidebarDivider />
      <SidebarItem>
        <SidebarLabel>TOPICS</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaGamepad />
        </SidebarIcon>
        <SidebarLabel>Gaming</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaFootballBall />
        </SidebarIcon>
        <SidebarLabel>Sports</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaChartLine />
        </SidebarIcon>
        <SidebarLabel>Business</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaSun />
        </SidebarIcon>
        <SidebarLabel>Crypto</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaTv />
        </SidebarIcon>
        <SidebarLabel>Television</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <FaStar />
        </SidebarIcon>
        <SidebarLabel>Celebrity</SidebarLabel>
      </SidebarItem>
      {/* <SidebarItem>See more</SidebarItem> */}
      <SidebarDivider />
      <SidebarItem>
        <SidebarLabel>RESOURCES</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <RiRedditFill />
        </SidebarIcon>
        <SidebarLabel>About Reddit</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoBriefcaseOutline />
        </SidebarIcon>
        <SidebarLabel>Advertise</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoHelpCircle />
        </SidebarIcon>
        <SidebarLabel>Help</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoNewspaperOutline />
        </SidebarIcon>
        <SidebarLabel>Blog</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoBriefcaseOutline />
        </SidebarIcon>
        <SidebarLabel>Careers</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoDocumentText />
        </SidebarIcon>
        <SidebarLabel>Press</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <RiCommunityFill />
        </SidebarIcon>
        <SidebarLabel>Communities</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <RiAwardFill />
        </SidebarIcon>
        <SidebarLabel>Best of Reddit</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoDocumentText />
        </SidebarIcon>
        <SidebarLabel>Topics</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoDocumentText />
        </SidebarIcon>
        <SidebarLabel>Content Policy</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoDocumentText />
        </SidebarIcon>
        <SidebarLabel>Privacy Policy</SidebarLabel>
      </SidebarItem>
      <SidebarItem>
        <SidebarIcon>
          <IoDocumentText />
        </SidebarIcon>
        <SidebarLabel>User Agreement</SidebarLabel>
      </SidebarItem>
      <SidebarDivider />
      <SidebarItem>Konect, Inc. © 2024. All rights reserved.</SidebarItem>

      {/* </div> */}
    </SidebarContainer>
  );
};

export default Dashboard;
















// import "/src/styles/dashboard.css"
// function Dashboard() {
//   return (
//     <div id="dashboard-container">
//       <div id='dashboard-wrapper'>
//         <h1>Dashboard</h1>
//       </div>
//     </div>
//   );
// }
// export default Dashboard;

// import React from 'react';


// import styled from 'styled-components';

// const SidebarContainer = styled.div`
//   // background-color: #000;
//   color: #fff;
//   width: 25%;
//   position: sticky;
//   min-width: 210px;
//   padding: 20px;
// `;

// const SidebarItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;

// `;

// const SidebarIcon = styled.span`
//   margin-right: 10px;
// `;

// const SidebarLabel = styled.span``;

// const SidebarCount = styled.span`
//   margin-left: auto;
// `;

// const sidebarItems = [
//   { icon: '📥', label: 'Inbox', count: 128 },
//   { icon: '📝', label: 'Drafts', count: 9 },
//   { icon: '➡', label: 'Sent' },
//   { icon: '🚮', label: 'Junk', count: 23 },
//   { icon: '🗑', label: 'Trash' },
//   { icon: '📁', label: 'Archive' },
//   { icon: '👥', label: 'Social', count: 972 },
//   { icon: '🆙', label: 'Updates', count: 342 },
//   { icon: '💬', label: 'Forums', count: 128 },
//   { icon: '🛒', label: 'Shopping', count: 8 },
//   { icon: '🏷', label: 'Promotions', count: 21 },
// ];

// const Dashboard = () => {
//   return (
//     <SidebarContainer>
//       <div>
//       {sidebarItems.map((item, index) => (
//         <SidebarItem key={index}>
//           <SidebarIcon>{item.icon}</SidebarIcon>
//           <SidebarLabel>{item.label}</SidebarLabel>
//           {item.count && <SidebarCount>{item.count}</SidebarCount>}
//         </SidebarItem>
//       ))}
//       </div>
//     </SidebarContainer>
//   );
// };

// export default Dashboard;