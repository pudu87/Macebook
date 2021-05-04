import Ditto from '../../images/ditto.jpeg'

export function getFullName(profile) {
  return profile.first_name + ' ' + profile.last_name;
}

export function getAvatarUrl(img) {
  return img ? `url(${img})` : `url(${Ditto})`;
}

export function transformKey(key) {
  return key.split('_')
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join(' ');
}

export function getPictureName(picture, name) {
  if (picture[name] === null) {
    return 'No File Selected';
  } else {
    return picture[name].name ? picture[name].name : `Current ${name}`;
  }
} 
