import { useState, useEffect, useCallback } from 'react'
import { API_URL } from '../../Constants'
import Friend from '../subcomponents/Friend'

function Friends(props) {

  const userId = props.userId;
  const [friends, setFriends] = useState([]);

  const initFriends = useCallback(async () => {
    const path = '/friendships/' + userId;
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
  }, [userId]);

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