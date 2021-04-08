export function getFullName(profile) {
  return profile.first_name + ' ' + profile.last_name;
}

export function getNewPostRequestOptions(content) {
  return {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ post: { content: content } })
  }
}

export function transformKey(key) {
  return key.split('_')
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ');
}
