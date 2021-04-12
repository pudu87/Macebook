import { useState, useEffect, useCallback } from 'react'
import { API_URL } from '../../Constants'
import isEmpty from 'lodash/isEmpty'
import Friend from '../subcomponents/Friend'

function Friends(props) {

  const userStatus = props.userStatus;
  const [friends, setFriends] = useState([]);

  const initFriends = useCallback(async () => {
    const path = '/friendships/' + userStatus.id;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const newFriends = await response.json();
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

  function getFriendList(category) {
    return friends[category].map(friend => {
      return (
      <Friend 
        key={friend.id}
        userStatus={userStatus}
        data={friend}
        category={categories[category]}
        onHandleRequest={handleRequest}/>
      )
    })
  }

  async function handleRequest(method, id) {
    const path = method === 'POST' ? '/friendships' : '/friendships/' + id;
    const body = method === 'POST' ? 
      JSON.stringify({ friendship: { friend_id: id } }) : null;
    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body
    };
    const response = await fetch(API_URL + path, requestOptions);
    const result = await response.json();
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

  return (
    <div id="friends">
      Friends
      <ul>{categoryList}</ul>
    </div>
  );
}

export default Friends;
