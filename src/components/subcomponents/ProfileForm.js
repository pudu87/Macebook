import { useState } from 'react'
import { transformKey } from '../logic/Helpers'

function ProfileForm(props) {

  const [profile, setProfile] = useState(props.profile);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleProfileChange(profile);
  }

  function changeItem(e) {
    setProfile({...profile, [e.target.id]: e.target.value})
  }

  const formList = Object.keys(profile).map(key => {
    return (
      <label key={key}>{transformKey(key) + ': '}
        <input
          type='text'
          id={key}
          name={key}
          value={profile[key]}
          onChange={changeItem}/>
      </label>
    )
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
