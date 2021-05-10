import Messages from './user/Messages'

function DashBoard(props) {

  const userStatus = {
    id: false,
    currentUserId: props.currentUserId,
    isCurrentUser: true
  };

  return (
    <div id="dashboard">
      <Messages userStatus={userStatus}/>
    </div>
  );
}

export default DashBoard;
