import { defHttp, timHttp } from '@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  LoginApiRequest,
  LoginApiResponse,
} from './model/userModel';

import { ErrorMessageMode } from '#/axios';

// FST 改apiUrl
enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  FSTlogin = '/backstages/login',
  FSTeditPassword = '/backstages/password',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

/**
 * @description: FST user login api
 */
export function loginFSTApi(params: LoginApiRequest, mode: ErrorMessageMode = 'modal') {
  return timHttp.post<{ data: LoginApiResponse }>(
    {
      url: Api.FSTlogin,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: FST edit password
 */
export function editPassword(params: { password: string; confirmPassword: string }) {
  return timHttp.patch({
    url: Api.FSTeditPassword,
    params,
  });
}
