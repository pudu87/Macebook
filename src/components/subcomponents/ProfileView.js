import { transformKey } from '../logic/Helpers'

function ProfileView(props) {

  const profile = props.profile;

  const profileList = Object.entries(profile).map(([key, value]) => {
    return (
      <li key={key}>
        <span>{transformKey(key) + ': '}</span>
        <span>{value}</span>
      </li>
    )
  });

  return (
    <div id="profileview">
      ProfileView
      <ul>{profileList}</ul>
    </div>
  );
}

export default ProfileView;
