import { useEffect, useState } from 'react'
import { API_URL } from '../Constants'
import Messages from './user/Messages'

function DashBoard() {

  const [userStatus, setUserStatus] = useState({
    id: false,
    currentUserId: null,
    isCurrentUser: true
  });

  async function initUserStatus() {
    const path = '/users/' + 0;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const currentUserId = await response.json();
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
