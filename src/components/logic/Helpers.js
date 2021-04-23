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

export async function fetchNewLike(id) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ like: { post_id: id } })
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
