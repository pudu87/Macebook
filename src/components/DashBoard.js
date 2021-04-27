import { useEffect, useState } from 'react'
import { fetchApi } from './helpers/Fetching';
import Messages from './user/Messages'

function DashBoard() {

  const [userStatus, setUserStatus] = useState({
    id: false,
    currentUserId: null,
    isCurrentUser: true
  });

  async function initUserStatus() {
    const path = '/users/' + 0;
    const currentUserId = await fetchApi(path, 'GET');
    setUserStatus(prev => {
      return { ...prev, currentUserId: currentUserId }
    });
  }

  useEffect(() => {
    initUserStatus();
  },[]);

  return (
    <div id="dashboard">
      <Messages userStatus={userStatus}/>
    </div>
  );
}

export default DashBoard;
