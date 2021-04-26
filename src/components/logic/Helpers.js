import { API_URL } from '../../Constants'
import Ditto from '../../images/ditto.jpeg'

export function getFullName(profile) {
  return profile.first_name + ' ' + profile.last_name;
}

export function getAvatarUrl(img) {
  return img ? `url(${img})` : `url(${Ditto})`;
}

export async function fetchNewPost(post) {
  const formData = new FormData();
  Object.entries(post).forEach(([key, value]) => {
    formData.append(`post[${key}]`, value);
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': localStorage.getItem('token')},
    body: formData
  }
  const response = await fetch(API_URL + '/posts', requestOptions);
  return await response.json();
}

export async function editPost(post, id) {
  const formData = new FormData();
  Object.entries(post).forEach(([key, value]) => {
    formData.append(`post[${key}]`, value);
  })
  const path = '/posts/' + id;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Authorization': localStorage.getItem('token') },
    body: formData
  }
  const response = await fetch(API_URL + path, requestOptions);
  return await response.json();
}

export async function deletePost(id) {
  const path = '/posts/' + id;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }
  await fetch(API_URL + path, requestOptions);
}

export async function fetchNewComment(id, type, content) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ 
      comment: { 
        content: content,
        commentable_id: id,
        commentable_type: type
      } 
    })
  }
  const response = await fetch(API_URL + '/comments', requestOptions);
  return await response.json();
}

export async function editComment(comment, id) {
  const formData = new FormData();
  Object.entries(comment).forEach(([key, value]) => {
    formData.append(`comment[${key}]`, value);
  })
  const path = '/comments/' + id;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Authorization': localStorage.getItem('token') },
    body: formData
  }
  const response = await fetch(API_URL + path, requestOptions);
  return await response.json();
}

export async function deleteComment(id) {
  const path = '/comments/' + id;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }
  await fetch(API_URL + path, requestOptions);
}

export async function fetchNewLike(id, type) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ 
      like: { 
        likeable_id: id,
        likeable_type: type
        }
      })
  }
  const response = await fetch(API_URL + '/likes', requestOptions);
  return await response.json();
}

export async function deleteLike(id) {
  const path = '/likes/' + id;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }
  await fetch(API_URL + path, requestOptions);
}

export function transformKey(key) {
  return key.split('_')
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ');
}
