import { timHttp, timMediaHttp } from '@/utils/http/axios';

enum Api {
  getVideo = '/videos',
  videoDetail = '/videos/:query',
  postVideo = '/videos/video',
  editVideostate = '/videos/:query/state',
}

const replaceQuery = (url: string, query: number | string): string => {
  return url.replace(':query', query.toString());
};

/**
 * @description 上傳影片
 */
export const createVideo = async (data) => {
  await timMediaHttp.post({
    url: Api.postVideo,
    data,
  });
};

/**
 * @description 新增影片
 */
export const createVideos = async (params) =>
  (
    await timHttp.post({
      url: Api.getVideo,
      params,
    })
  ).data;

/**
 * @description 取得用戶列表
 */
export const getVideo = async (params) => {
  const res = await timHttp.get({
    url: Api.getVideo,
    params,
  });
  const data = {
    total: 100,
    items: res.data,
  };
  return data;
};

/**
 * @description 取得影片詳情
 */
export const getVideoDetail = async (videoId: number) => {
  const res = await timHttp.get({
    url: replaceQuery(Api.videoDetail, videoId),
  });
  return res.data;
};

/**
 * @description 編輯影片詳情
 */
export const editVideoDetail = async (videoId: number, data) => {
  await timHttp.put({
    url: replaceQuery(Api.videoDetail, videoId),
    data,
  });
};

/**
 * @description 修改影片狀態
 */
export const editVideoState = async (videoId: number, params: { status: number }) =>
  (
    await timHttp.patch({
      url: replaceQuery(Api.editVideostate, videoId),
      params,
    })
  ).data;
