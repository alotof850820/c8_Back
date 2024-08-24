import { timHttp } from '@/utils/http/axios';

enum Api {
  getTags = '/tags',
  editTags = '/tags/:query',
}
const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

/**
 * @description 取得標籤列表
 */
export const getTags = async (params) => {
  const res = await timHttp.get({
    url: Api.getTags,
    params,
  });
  const data = {
    total: 100,
    items: res.data,
  };
  return data;
};

/**
 * @description 編輯標籤狀態
 */
export const editTagEnable = async (tagId: number, data: { enable: number }) =>
  (await timHttp.patch({ url: replaceQuery(Api.editTags, tagId), data })).data;
