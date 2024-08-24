import { timHttp } from '@/utils/http/axios';

enum Api {
  getBooking = '/admin/bookings',
  editBookingStatus = '/admin/bookings/:query/status',
  editBookingCompletedAmount = '/admin/bookings/:query/completedAmount',
  getBookingDetail = '/admin/bookings/:query',
  getOwnerBookingDetail = '/owner/bookings/:query',
  getOwnerBooking = '/owner/bookings',
  getCity = '/cities',
}
const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

/**
 * @description 取得預約列表
 */
export const getBooking = async (params) => {
  const res = await timHttp.get({
    url: Api.getBooking,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

/**
 * @description 編輯預約狀態
 */
export const editBookingStatus = async (bookingId: number, data: { status: number }) =>
  (await timHttp.patch({ url: replaceQuery(Api.editBookingStatus, bookingId), data })).data;

/**
 * @description 編輯預約完全金額
 */
export const editBookingCompletedAmount = async (
  bookingId: number,
  data: { completedAmount: number },
) =>
  (await timHttp.patch({ url: replaceQuery(Api.editBookingCompletedAmount, bookingId), data }))
    .data;

/**
 * @description 取得預約詳情
 */
export const getBookingDetail = async (bookingId: number) => {
  const res = await timHttp.get({
    url: replaceQuery(Api.getBookingDetail, bookingId),
  });
  return res.data;
};

/**
 * @description 取得城市
 */
export const getCities = async () => {
  const res = await timHttp.get({
    url: Api.getCity,
  });
  return res.data;
};

/**
 * @description 編輯預約
 */
export const editBooking = async (bookingId: number, data) => {
  await timHttp.put({
    url: replaceQuery(Api.getBookingDetail, bookingId),
    data,
  });
};

/**
 * @description 取得預約列表(owner)
 */
export const getOwnerBooking = async (params) => {
  const res = await timHttp.get({
    url: Api.getOwnerBooking,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

/**
 * @description 取得預約詳情(owner)
 */
export const getOwnerBookingDetail = async (bookingId: number) => {
  const res = await timHttp.get({
    url: replaceQuery(Api.getOwnerBookingDetail, bookingId),
  });
  return res.data;
};
