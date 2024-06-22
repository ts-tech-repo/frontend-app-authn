import { getConfig } from '@edx/frontend-platform';
import Cookies from 'universal-cookie';

export default function setCookie(cookieName, cookieValue, cookieExpiry) {
  const cookies = new Cookies();
  const options = { domain: getConfig().SESSION_COOKIE_DOMAIN, path: '/' };
  if (cookieExpiry) {
    options.expires = cookieExpiry;
  }
  cookies.set(cookieName, cookieValue, options);
}


export default function getCookie(name) {
  if (cookieName) { // To avoid setting getting exception when setting cookie with undefined names.
    const cookies = new Cookies();
    return cookies.get(name);
  }
}
