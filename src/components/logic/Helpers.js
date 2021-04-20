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

export function transformKey(key) {
  return key.split('_')
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ');
}
