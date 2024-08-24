import { timHttp } from '@/utils/http/axios';

enum Api {
  products = '/admin/products',
  getCurrencyDropdowns = '/admin/currencies/dropdown',
}

export interface ProductDetailApiRequest {
  name: string;
  introduce: string;
  amount: number;
  point: number;
  type: number;
  status: number;
  productBooking: {
    bookingTime: number;
    type: number;
  } | null;
  productPoint: {
    point: number;
  } | null;
}

export interface ProductDetailApiResponse
  extends Omit<ProductDetailApiRequest, 'productBooking' | 'productPoint'> {
  id: number;
  productBooking: {
    id: number;
    productId: number;
    bookingTime: number;
    type: number;
  };
  productPoint: {
    id: number;
    productId: number;
    point: number;
  };
}

/**
 * @description 新增商品
 */
export const createProducts = async (params: ProductDetailApiRequest) =>
  (
    await timHttp.post({
      url: Api.products,
      params,
    })
  ).data;

/**
 * @description 取得商品
 */
export const getProducts = async (params: {
  name: string;
  type: number;
  status: number;
  pageIndex: number;
  pageSize: number;
}) => {
  const res = await timHttp.get({
    url: Api.products,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

/**
 * @description 修改商品名稱
 */
export const editProductName = async (productId: number, params: { name: string }) =>
  (
    await timHttp.patch({
      url: `/admin/products/${productId}/name`,
      params,
    })
  ).data;

/**
 * @description 修改商品金額
 */
export const editProductAmount = async (productId: number, params: { amount: string }) =>
  (
    await timHttp.patch({
      url: `/admin/products/${productId}/amount`,
      params,
    })
  ).data;

/**
 * @description 修改商品狀態
 */
export const editProductStatus = async (productId: number, params: { status: number }) =>
  (
    await timHttp.patch({
      url: `/admin/products/${productId}/status`,
      params,
    })
  ).data;

/**
 * @description 修改商品點數
 */
export const editProductPoint = async (productId: number, params: { point: number }) =>
  (
    await timHttp.patch({
      url: `/admin/products/${productId}/point`,
      params,
    })
  ).data;

/**
 * @description 取得商品詳情
 */
export const getProductDetail = async (productId: number): Promise<ProductDetailApiResponse> =>
  (
    await timHttp.get({
      url: `/admin/products/${productId}`,
    })
  ).data;

/**
 * @description 修改商品
 */
export const editProduct = async (productId: number, params: ProductDetailApiRequest) =>
  (
    await timHttp.put({
      url: `/admin/products/${productId}`,
      params,
    })
  ).data;
