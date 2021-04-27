import { API_URL } from '../../Constants'

function getRequestOptions(method, data) {
  let headers = { 'Authorization': localStorage.getItem('token') }
  let body = data;
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(data);
  }
  return { method, headers, body };
}

function createFormData(data, param) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(`${param}[${key}]`, value);
  })
  return formData;
}

export async function fetchApi(path, method, data) {
  const resource = path.split('/')[1];
  const param = resource.slice(0, -1);
  const formDataCheck = ['POST', 'PUT'].includes(method) && 
    ['posts', 'profiles'].includes(resource);
  if (formDataCheck) {
    data = createFormData(data, param);
  } else if (data) {
    data = { [param]: data };
  }
  const requestOptions = getRequestOptions(method, data);
  const response = await fetch(API_URL + path, requestOptions);
  if (method !== 'DELETE' || resource === 'friendships') { 
    return await response.json();
  }
}
