function OptionList(props) {

  const { entity, edit, editable, likeable } = props;

  return (
    <div className='options'>
      {editable &&
        <button 
          className={`toggle-edit-${entity} icon-button`}
          onClick={props.onToggleEdit}>
          <i className={'fas fa-' + (edit ? 'undo' : 'edit')}></i>
        </button>}
      {editable &&
        <button 
          className={`delete-${entity} icon-button`}
          onClick={props.onDelete}>
          <i className="far fa-trash-alt"></i>
        </button>}
      <button 
        className='like icon-button'
        onClick={() => { likeable ? props.onUnlike() : props.onLike() }}>
        <i className={'fas fa-thumbs-up ' + (likeable ? 'liked' : 'unliked')}></i>
      </button>
    </div>
  )
}

export default OptionList;
