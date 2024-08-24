import { timHttp, timHttpBigInt } from '@/utils/http/axios';

enum Api {
  Channels = '/admin/channels',
  getChannelsStats = '/admin/channels/stats',
}

/**
 * @description 建立渠道
 */
export const postChannels = async (params) => {
  await timHttp.post({
    url: Api.Channels,
    params,
  });
};

/**
 * @description 取得渠道列表
 */
export const getChannels = async (params) => {
  const res = await timHttpBigInt.get({
    url: Api.Channels,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items.map((item) => {
      if (item.id.c) {
        item.id = item.id.c.map((num) => num.toString()).join('');
      }
      return item;
    }),
  };
  return data;
};

/**
 * @description 取得渠道統計列表
 */
export const getChannelsStats = async (params) => {
  const res = await timHttpBigInt.get({
    url: Api.getChannelsStats,
    params,
  });
  const data = {
    total: res.data.count,
    items: res.data.items.map((item) => {
      if (item.id.c) {
        item.id = item.id.c.map((num) => num.toString()).join('');
      }
      return item;
    }),
  };
  return data;
};

/**
 * @description 取得渠道每日統計列表
 */
export const getChannelsDialyStats = async (params) => {
  const res = await timHttp.get({
    url: `/admin/channels/${params.channelId}/stats/dialy`,
    params,
  });
  const data = {
    total: res.data.length,
    items: res.data,
  };
  return data;
};

/**
 * @description 取得渠道每日統計列表(Owner)
 */
export const getChannelsOwnerDialyStats = async (params) => {
  const res = await timHttp.get({
    url: `/owner/channels/stats/dialy`,
    params,
  });

  const data = {
    total: res.data.length,
    items: res.data,
  };
  return data;
};

/**
 * @description 修改渠道ＩＤ
 */
export const patchChannelsKey = async (channelId, params: { nid: string }) => {
  await timHttp.patch({
    url: `/admin/channels/${channelId}/nid`,
    params,
  });
};

/**
 * @description 修改渠道域名
 */
export const patchChannelsDomain = async (channelId, params: { domain: string }) => {
  await timHttp.patch({
    url: `/admin/channels/${channelId}/domain`,
    params,
  });
};

/**
 * @description 修改渠道類型
 */
export const patchChannelsType = async (channelId, params: { type: number }) => {
  await timHttp.patch({
    url: `/admin/channels/${channelId}/type`,
    params,
  });
};

/**
 * @description 建立渠道帳號
 */
export const postChannelsAccount = async (
  channelId,
  params: { email: string; password: string; confirmPassword: string },
) => {
  await timHttp.post({
    url: `/admin/channels/${channelId}/account`,
    params,
  });
};

/**
 * @description 修改渠道分紅百分比
 */
export const patchChannelsDividendPercent = async (
  channelId,
  params: { dividendPercent: number },
) => {
  await timHttp.patch({
    url: `/admin/channels/${channelId}/dividendPercent`,
    params,
  });
};
