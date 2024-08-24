import { timMediaHttp, timHttp } from '@/utils/http/axios';

enum Api {
  createGirl = '/admin/actresses',
}

export interface girlDetailApiRequest {
  name: string;
  avatar?: string | null;
  birthday: string;
  height: number;
  weight: number;
  cupSize: string;
  introduce: string;
  isHot: boolean;
  type: number;
  status: number;
  remark?: string;
  pinYin?: string;
  video?: string | null;
  cover?: string | null;
  depositCurrencyId: number;
  deposit: number;
  dateExpensesCurrencyId: number;
  dateExpenses?: number;
  imageIds?: number[] | null;
  images?: any[] | null;
}

/**
 * @description 创建女優
 */
export const createGirl = async (params: FormData) =>
  await timMediaHttp.post({
    url: Api.createGirl,
    params,
  });

/**
 * @description 获取女優列表
 */
export const getGirls = async (params) => {
  const res = await timHttp.get({
    url: Api.createGirl,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

/**
 * @description 修改女優狀態
 */
export const editGirlStatus = async (actressId: number, params: { status: number }) =>
  await timHttp.patch({
    url: `/admin/actresses/${actressId}/status`,
    params,
  });

/**
 * @description 修改女優類型
 */
export const editGirlType = async (actressId: number, params: { type: number }) =>
  await timHttp.patch({
    url: `/admin/actresses/${actressId}/type`,
    params,
  });

/**
 * @description 修改女優熱門狀態
 */
export const editGirlHot = async (actressId: number, params: { isHot: boolean }) =>
  await timHttp.patch({
    url: `/admin/actresses/${actressId}/hot`,
    params,
  });

/**
 * @description 修改女優生日
 */
export const editGirlBirthday = async (actressId: number, params: { birthday: string }) =>
  await timHttp.patch({
    url: `/admin/actresses/${actressId}/birthday`,
    params,
  });

/**
 * @description 修改女優生日
 */
export const editGirlAge = async (actressId: number, params: { age: number }) =>
  await timHttp.patch({
    url: `/admin/actresses/${actressId}/age`,
    params,
  });

/**
 * @description 取得女優詳情
 */
export const getGirlDetail = async (actressId: number) =>
  (
    await timHttp.get({
      url: `/admin/actresses/${actressId}`,
    })
  ).data;

/**
 * @description 取得女優詳情
 */
export const editGirlDetail = async (actressId: number, params: FormData) =>
  (
    await timMediaHttp.put({
      url: `/admin/actresses/${actressId}`,
      params,
    })
  ).data;
