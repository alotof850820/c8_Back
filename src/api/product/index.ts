import { timHttp, timMediaHttp } from '@/utils/http/axios';

enum Api {
  products = '/products',
  getCurrencyDropdowns = '/currencies/dropdown',
  editProductsName = '/products/:query/name',
  editProductsDescription = '/products/:query/description',
  editProductsState = '/products/:query/state',
  editProductsPrice = '/products/:query/price',
  editProductsDiscount = '/products/:query/price/discount',
  editProductsCoin = '/products/:query/coin',
  editProductsImage = '/products/:query/image',
}

const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

/**
 * @description 新增商品
 */
export const createProducts = async (params) =>
  (
    await timMediaHttp.post({
      url: Api.products,
      params,
    })
  ).data;

/**
 * @description 取得商品
 */
export const getProducts = async (params) => {
  const res = await timHttp.get({
    url: Api.products,
    params,
  });
  const data = {
    total: 100,
    items: res.data,
  };
  return data;
};

/**
 * @description 修改商品名稱
 */
export const editProductName = async (productId: number, params: { name: string }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editProductsName, productId),
      params,
    })
  ).data;

/**
 * @description 修改商品描述
 */
export const editProductDescription = async (productId: number, params: { description: string }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editProductsDescription, productId),
      params,
    })
  ).data;

/**
 * @description 修改商品狀態
 */
export const editProductStatus = async (productId: number, params: { state: number }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editProductsState, productId),
      params,
    })
  ).data;

/**
 * @description 修改商品金額
 */
export const editProductPrice = async (productId: number, params: { price: string }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editProductsPrice, productId),
      params,
    })
  ).data;

/**
 * @description 修改商品優惠價格
 */
export const editProductDiscount = async (productId: number, params: { discount: number }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editProductsDiscount, productId),
      params,
    })
  ).data;
/**
 * @description 修改商品代幣
 */
export const editProductCoin = async (productId: number, params: { coin: number }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editProductsCoin, productId),
      params,
    })
  ).data;

/**
 * @description 修改商品圖片
 */
export const editProductImage = async (productId: number, params: { image: string }) =>
  (
    await timMediaHttp.patch({
      url: replaceQuery(Api.editProductsImage, productId),
      params,
    })
  ).data;
