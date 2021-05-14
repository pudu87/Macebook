import { useState, useEffect, useCallback } from 'react'
import { fetchApi } from '../helpers/Fetching';
import isEmpty from 'lodash/isEmpty'
import UserDisplay from '../subcomponents/UserDisplay'

function Friends(props) {

  const userStatus = props.userStatus;
  const [friends, setFriends] = useState([]);
  const [catView, setCatView] = useState({
    confirmed: true, 
    pending: true,
    proposed: true,
    possible: true
  });

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
      text: 'Request',
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

  function handleCategoryView(category) {
    setCatView({ 
      ...catView, 
      [category]: !catView[category] 
    });
  }

  const categoryList = Object.keys(friends).map(category => {
    return (
      !isEmpty(friends[category]) &&
      <li 
        key={category}
        className='category'>
        <header onClick={() => handleCategoryView(category)}> 
          <i className={'fas fa-chevron-' + (catView[category] ? 'down' : 'up')}></i>
          &nbsp;{category}
        </header>
        {catView[category] && <ul>{getFriendList(category)}</ul>}
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
    return (
      <div className='friend-request'>
        {cat.method ?
        (<button 
          className='button'
          onClick={() => handleRequest(cat.method, id)}>
          {cat.text}
        </button>) :
        cat.text}
      </div>
    );
  }

  return (
    <div id="friends">
      <ul>{categoryList}</ul>
    </div>
  );
}

export default Friends;
