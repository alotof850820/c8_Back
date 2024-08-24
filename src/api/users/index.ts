import { timHttp } from '@/utils/http/axios';

enum Api {
  getUsers = '/admin/users',
  getOwnerUsers = '/owner/users',
}

/**
 * @description 取得用戶列表
 */
export const getUsers = async (params) => {
  const res = await timHttp.get({
    url: Api.getUsers,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

// 修改用戶狀態
export const editUsersStatus = async (userId: number, params: { status: number }) =>
  (
    await timHttp.patch({
      url: `/admin/users/${userId}`,
      params,
    })
  ).data;

/**
 * @description 取得用戶列表(owner)
 */
export const getOwnerUsers = async (params) => {
  const res = await timHttp.get({
    url: Api.getOwnerUsers,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};
