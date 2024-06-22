import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import * as QueryString from 'query-string';

import Cookies from 'universal-cookie';

export default function getCookie(name) {
  if (cookieName) { // To avoid setting getting exception when setting cookie with undefined names.
    const cookies = new Cookies();
    return cookies.get(name);
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function loginRequest(creds) {
  const requestConfig = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',  'X-CSRFToken' : getCookie('csrftoken') },
    isPublic: true,
  };

  const { data } = await getAuthenticatedHttpClient()
    .post(
      `${getConfig().LMS_BASE_URL}/api/user/v2/account/login_session/`,
      QueryString.stringify(creds),
      requestConfig,
    )
    .catch((e) => {
      throw (e);
    });

  return {
    redirectUrl: data.redirect_url || `${getConfig().LMS_BASE_URL}/dashboard`,
    success: data.success || false,
  };
}
