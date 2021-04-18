import { transformKey } from '../logic/Helpers'

function ProfileView(props) {

  const profile = props.profile;

  function getAvatar(key, value) {
    return (
      <div
        key={key}
        className={key}
        style={{ backgroundImage: `url(${value})` }}>
      </div>
    )
  }

  function getAttribute(key, value) {
    return (
      <li 
        key={key}
        className={key}>
          <span>{transformKey(key) + ': '}</span>
          <span>{value}</span>
      </li>
    )
  }

  const profileList = Object.entries(profile).map(([key, value]) => {
    return key === 'avatar' ? getAvatar(key, value) : getAttribute(key, value);
  });

  return (
    <div id="profileview">
      ProfileView
      <ul>{profileList}</ul>
    </div>
  );
}

export default ProfileView;
