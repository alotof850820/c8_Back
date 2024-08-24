import { timHttp } from '@/utils/http/axios';

enum Api {
  getCoupons = '/coupons',
  getCouponsDetail = '/coupons/:query',
  editCouponsgStatus = '/coupons/:query/state',
}
const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

/**
 * @description 建立優惠眷
 */
export const postCoupon = async (params) => {
  return await timHttp.post({
    url: Api.getCoupons,
    params,
  });
};

/**
 * @description 取得優惠眷列表
 */
export const getCoupons = async (params) => {
  const res = await timHttp.get({
    url: Api.getCoupons,
    params,
  });
  const data = {
    total: 100,
    items: res.data,
  };
  return data;
};

/**
 * @description 取得優惠眷詳情
 */
export const getCouponsDetail = async (couponsId: number) => {
  const res = await timHttp.get({
    url: replaceQuery(Api.getCouponsDetail, couponsId),
  });
  return res.data;
};

/**
 * @description 編輯優惠眷
 */
export const editCoupons = async (couponsId: number, data) => {
  await timHttp.put({
    url: replaceQuery(Api.getCouponsDetail, couponsId),
    data,
  });
};

/**
 * @description 編輯預約狀態
 */
export const editCouponsStatus = async (couponsId: number, data: { state: number }) =>
  (await timHttp.patch({ url: replaceQuery(Api.editCouponsgStatus, couponsId), data })).data;
