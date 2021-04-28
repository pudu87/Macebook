import { useState } from 'react'
import { transformKey } from '../helpers/General'

function EditProfile(props) {

  const [profile, setProfile] = useState(props.profile);

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof profile.avatar === 'string') { 
      const { avatar, ...profileWithoutAvatar } = profile;
      props.onProfileChange(profileWithoutAvatar);
    } else {
      props.onProfileChange(profile);
    }
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setProfile({...profile, [e.target.name]: e.target.files[0]})
    } else {
      setProfile({...profile, [e.target.name]: e.target.value})
    }
  }

  const formList = Object.keys(profile).map(key => {
    const avatar = key === 'avatar';
    return (
      <label key={key}>{transformKey(key) + ': '}
        <input
          type={avatar ? 'file' : 'text'}
          name={key}
          value={avatar ? undefined : profile[key]}
          onChange={handleChange}/>
      </label>
    )
  });

  return (
    <div id="profileform">
      ProfileForm
      <form onSubmit={handleSubmit}>
        {formList}
        <input type='submit' value='Confirm Changes'/>
      </form>
      <button onClick={() => {props.onChangeView()}}>Back To View</button>
    </div>
  );
}

export default EditProfile;
