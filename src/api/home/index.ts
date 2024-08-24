import { timHttp, timMediaHttp } from '@/utils/http/axios';

enum Api {
  HomesArticles = '/admin/home/articles',
  EditArticlesStatus = '/admin/home/articles/:query/status',
  EditArticlesTitle = '/admin/home/articles/:query/title',
  EditArticlesCover = '/admin/home/articles/:query/cover',
  ArticlesDetail = '/admin/home/articles/:query',
}

const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

// 創建首頁文章
export const postHomesArticles = async (data: FormData) => {
  await timMediaHttp.post({
    url: Api.HomesArticles,
    data,
  });
};

// 取得首頁文章列表
export const getHomesArticles = async (params: {
  title: string;
  status: number;
  pageIndex: number;
  pageSize: number;
}) => {
  const res = await timHttp.get({
    url: Api.HomesArticles,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items,
  };
  return data;
};

// 修改首頁文章狀態
export const patchHomesArticlesStatus = async (homeArticleId: number, data: { status: number }) => {
  await timHttp.patch({
    url: replaceQuery(Api.EditArticlesStatus, homeArticleId),
    data,
  });
};

// 修改首頁文章標題
export const patchHomesArticlesTitle = async (homeArticleId: number, data: { title: string }) => {
  await timHttp.patch({
    url: replaceQuery(Api.EditArticlesTitle, homeArticleId),
    data,
  });
};

// 修改首頁文章封面
export const patchHomesArticlesCover = async (homeArticleId: number, data: { cover: string }) => {
  await timMediaHttp.patch({
    url: replaceQuery(Api.EditArticlesCover, homeArticleId),
    data,
  });
};

// 取得首頁文章詳情
export const getHomesArticlesDetail = async (homeArticleId: number) => {
  return await timHttp.get({
    url: replaceQuery(Api.ArticlesDetail, homeArticleId),
  });
};

// 修改首頁文章詳情
export const putHomesArticlesDetail = async (homeArticleId: number, data: FormData) => {
  return await timMediaHttp.put({
    url: replaceQuery(Api.ArticlesDetail, homeArticleId),
    data,
  });
};
