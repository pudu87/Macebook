import { useState } from 'react'
import { transformKey, getPictureName } from '../helpers/General'

function EditProfile(props) {

  const [edit, setEdit] = useState(props.profile);

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof edit.avatar === 'string') { 
      const { avatar, ...editWithoutAvatar } = edit;
      props.onProfileChange(editWithoutAvatar);
    } else {
      props.onProfileChange(edit);
    }
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setEdit({...edit, [e.target.name]: e.target.files[0]})
    } else {
      setEdit({...edit, [e.target.name]: e.target.value})
    }
  }

  const formList = Object.keys(edit).map(key => {
    if (key === 'avatar') return false;
    return (
      <div key={key}>
        <label>{transformKey(key) + ': '}</label>
        <input
          type='text'
          name={key}
          value={edit[key]}
          onChange={handleChange}/>
      </div>
    )
  });

  return (
    <div id="profile-edit">
      <form onSubmit={handleSubmit}>
        {formList}
        <div className='file-upload'>
          <label>Avatar:</label>
          <input
            type='file'
            id='avatar'
            name='avatar'
            onChange={handleChange}/>
          <label htmlFor='avatar'>Change</label>
          <span>{getPictureName(edit, 'avatar')}</span>
        </div>
        <input type='submit' value='Confirm Changes'/>
      </form>
      <button onClick={() => {props.onChangeView()}}>Back To View</button>
    </div>
  );
}

export default EditProfile;
