import { useState, useEffect, useCallback } from 'react'
import { fetchApi } from '../helpers/Fetching';
import isEmpty from 'lodash/isEmpty'
import UserDisplay from '../subcomponents/UserDisplay'

function Friends(props) {

  const userStatus = props.userStatus;
  const [friends, setFriends] = useState([]);

  const initFriends = useCallback(async () => {
    const path = '/friendships/' + userStatus.id;
    const newFriends = await fetchApi(path, 'GET');
    setFriends(newFriends);
  }, [userStatus]);

  useEffect(() => {
    initFriends();
  }, [initFriends]);

  const categories = {
    confirmed: {
      text: 'Defriend',
      method: 'DELETE'
    },
    pending: {
      text: 'Accept Request',
      method: 'PUT'
    },
    proposed: {
      text: 'Awaiting Confirmation...',
      method: false
    },
    possible: {
      text: 'Send Request',
      method: 'POST'
    }
  };

  async function handleRequest(method, id) {
    const path = method === 'POST' ? '/friendships' : '/friendships/' + id;
    const data = method === 'POST' ? { friend_id: id } : null;
    const result = await fetchApi(path, method, data);
    updateFriendList(result);
  }

  function updateFriendList(result) {
    const remove = friends[result.from].filter(friend => {
      return friend.id !== result.data.id;
    });
    const add = [result.data, ...friends[result.to]];
    setFriends({
      ...friends,
      [result.from]: remove,
      [result.to]: add
    });
  }

  const categoryList = Object.keys(friends).map(category => {
    return (
      !isEmpty(friends[category]) &&
      <li key={category}>
        {category}
        <ul>{getFriendList(category)}</ul>
      </li>
    )
  });


  function getFriendList(category) {
    return friends[category].map(friend => {
      return (
        <li 
          key={friend.id}
          className='friend'>
          <UserDisplay data={friend}/>
          {userStatus.isCurrentUser && 
            renderButton(categories[category], friend.id)}
        </li>
      )
    })
  }

  function renderButton(cat, id) {
    return cat.method ?
      <button onClick={() => handleRequest(cat.method, id)}>{cat.text}</button> :
      <div>{cat.text}</div>
  }

  return (
    <div id="friends">
      Friends
      <ul>{categoryList}</ul>
    </div>
  );
}

export default Friends;
