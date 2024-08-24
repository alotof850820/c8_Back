import { timHttp } from '@/utils/http/axios';

enum Api {
  getCurrency = '/admin/currencies',
  getCurrencyDropdowns = '/admin/currencies/dropdown',
}

/**
 * @description 取得幣別列表
 */
export const getCurrency = async (params) => {
  const res = await timHttp.get({
    url: Api.getCurrency,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

/**
 * @description 取得幣別下拉選單
 */
export const getCurrencyDropdowns = async () =>
  (await timHttp.get({ url: Api.getCurrencyDropdowns })).data;
