import { useState } from 'react'
import { transformKey } from '../logic/Helpers'

function ProfileForm(props) {

  const [profile, setProfile] = useState(props.profile);

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof profile.avatar === 'string') { 
      const { avatar, ...alteredProfile } = profile;
      props.handleProfileChange(alteredProfile);
    } else {
      props.handleProfileChange(profile);
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
    if (key==='avatar') {
      return (
        <label key={key}>Avatar: 
          <input
            type='file'
            name={key}
            onChange={handleChange}/>
        </label>
      )
    } else {
      return (
        <label key={key}>{transformKey(key) + ': '}
          <input
            type='text'
            name={key}
            value={profile[key]}
            onChange={handleChange}/>
        </label>
      )
    }
  })

  return (
    <div id="profileform">
      ProfileForm
      <form onSubmit={handleSubmit}>
        {formList}
        <input type='submit' value='Confirm Changes'/>
      </form>
    </div>
  );
}

export default ProfileForm;
