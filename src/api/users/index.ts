import { timHttp, timMediaHttp } from '@/utils/http/axios';

enum Api {
  getUsers = '/users',
  userDetail = '/users/:query',
  postUserImage = '/users/image',
  postUserBgImage = '/users/background',
  editUserState = '/users/:query/state',
  editUserImage = '/users/:query/image',
  editUserBgImage = '/users/:query/background',
  editUserType = '/users/:query/type',
  getTrans = '/trans/:query/golds/history',
}

const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

/**
 * @description 取得金幣歷史紀錄
 */
export const getTrans = async (raw) => {
  const params = {
    pageIndex: raw.pageIndex,
    pageSize: raw.pageSize,
  };

  const res = await timHttp.get({
    url: replaceQuery(Api.getTrans, raw.userId),
    params,
  });
  const data = {
    total: 100,
    items: res.data,
  };
  return data;
};

/**
 * @description 新增用戶
 */
export const createUser = async (params) =>
  (
    await timHttp.post({
      url: Api.getUsers,
      params,
    })
  ).data;

/**
 * @description 取得用戶列表
 */
export const getUsers = async (params) => {
  const res = await timHttp.get({
    url: Api.getUsers,
    params,
  });
  const data = {
    total: 100,
    items: res.data,
  };
  return data;
};

/**
 * @description 新增用戶圖片(建立或編輯用)
 */
export const createUserImage = async (params) =>
  (
    await timMediaHttp.post({
      url: Api.postUserImage,
      params,
    })
  ).data;

/**
 * @description 新增用戶背景圖片
 */
export const createUserBgImage = async (params) =>
  (
    await timMediaHttp.post({
      url: Api.postUserBgImage,
      params,
    })
  ).data;

// 修改用戶狀態
export const editUsersStatus = async (userId: number, params: { status: number }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editUserState, userId),
      params,
    })
  ).data;

/**
 * @description 上船用戶頭貼(用戶列表或編輯資料用)
 */
export const patchUserImage = async (userId: number, params) =>
  (
    await timMediaHttp.patch({
      url: replaceQuery(Api.editUserImage, userId),
      params,
    })
  ).data;

/**
 * @description 上船用戶背景(編輯資料用)
 */
export const patchUserBgImage = async (userId: number, params) =>
  (
    await timMediaHttp.patch({
      url: replaceQuery(Api.editUserBgImage, userId),
      params,
    })
  ).data;

/**
 * @description 更新用戶類型
 */
export const patchUserType = async (userId: number, params: { type: number }) =>
  (
    await timMediaHttp.patch({
      url: replaceQuery(Api.editUserType, userId),
      params,
    })
  ).data;

/**
 * @description 取得用戶詳情
 */
export const getUserDetail = async (userId: number) => {
  const res = await timHttp.get({
    url: replaceQuery(Api.userDetail, userId),
  });
  return res.data;
};

/**
 * @description 編輯用戶詳情
 */
export const editUserDetail = async (userId: number, data) => {
  await timHttp.put({
    url: replaceQuery(Api.userDetail, userId),
    data,
  });
};
