import { useCallback, useEffect, useState } from 'react'
import { fetchApi } from '../helpers/Fetching';
import { getAvatarUrl, transformKey } from '../helpers/General'
import EditProfile from '../subcomponents/EditProfile'

function Profile(props) {

  const userStatus = props.userStatus;
  const [profile, setProfile] = useState({});
  const [view, setView] = useState(true);

  const initProfile = useCallback(async () => {
    const path = '/profiles/' + userStatus.id;
    const newProfile = await fetchApi(path, 'GET');
    setProfile(newProfile);
  }, [userStatus]);

  useEffect(() => {
    initProfile();
  }, [initProfile]);

  async function handleProfileChange(profile) {
    const path = '/profiles/' + userStatus.id;
    const newProfile = await fetchApi(path, 'PUT', profile);
    setProfile(newProfile);
    changeView();
    const header = {
        first_name: newProfile.first_name,
        last_name: newProfile.last_name,
        avatar: newProfile.avatar
    };
    props.onProfileUpdate(header);
  }

  function changeView() {
    setView(!view);
  }

  const noFriend = !userStatus.isFriend && 
    !userStatus.isCurrentUser &&
    <div>Befriend this user if you want to see more</div>;

  const profileList = Object.entries(profile).map(([key, value]) => {
    if (key === 'avatar') return false;
    return (
      <li key={key} className={key}>
        <span>{transformKey(key) + ': '}</span>
        <span>{value}</span>
      </li>
    );
  });

  const profileView = (
    <div id='profile-view'>
      <div 
        className='avatar'
        style={{ backgroundImage: getAvatarUrl(profile.avatar) }}>
      </div>
      <ul>{profileList}</ul>
      <button onClick={changeView}>Change Profile</button>
    </div>
  );

  return (
    <div id="profile">
      Profile
      {noFriend}
      {view ? 
        profileView :
        <EditProfile 
          profile={profile} 
          onProfileChange={handleProfileChange}
          onChangeView={changeView}/>
      }
    </div>
  );
}

export default Profile;
