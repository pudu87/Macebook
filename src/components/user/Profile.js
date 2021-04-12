import { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../../Constants'
import ProfileView from '../subcomponents/ProfileView'
import ProfileForm from '../subcomponents/ProfileForm'

function Profile(props) {

  const userStatus = props.userStatus;
  const [profile, setProfile] = useState({});
  const [view, setView] = useState(true);

  const initProfile = useCallback(async () => {
    const path = '/profiles/' + userStatus.id;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const newProfile = await response.json();
    setProfile(newProfile);
  }, [userStatus]);

  useEffect(() => {
    initProfile();
  }, [initProfile]);

  async function handleProfileChange(profile) {
    const path = '/profiles/' + userStatus.id;
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ profile })
    }
    const response = await fetch(API_URL + path, requestOptions);
    const newProfile = await response.json();
    setProfile(newProfile);
    changeView();
    const header = {
        first_name: newProfile.first_name,
        last_name: newProfile.last_name,
    };
    props.onProfileUpdate(header);
  }

  function changeView() {
    setView(!view);
  }

  const noFriend = !userStatus.isFriend && 
    !userStatus.isCurrentUser &&
    <div>Befriend this user if you want to see more</div>;

  return (
    <div id="profile">
      Profile
      {noFriend}
      {view ? 
        <ProfileView profile={profile}/> :
        <ProfileForm profile={profile} handleProfileChange={handleProfileChange}/>
      }
      {view ? 
        (userStatus.isCurrentUser && 
        <button onClick={changeView}>Change Profile</button>) :
        <button onClick={changeView}>Back To View</button>
      }
    </div>
  );
}

export default Profile;
