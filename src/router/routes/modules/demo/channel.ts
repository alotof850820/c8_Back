import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const channel: AppRouteModule = {
  path: '/channel',
  name: 'Channel',
  component: LAYOUT,
  redirect: '/channelList',
  meta: {
    orderNo: 6000,
    icon: 'uil:channel',
    title: t('routes.demo.channel.moduleName'),
    roles: [RoleEnum.SUPER],
    hideMenu: true,
  },
  children: [
    {
      path: '/channel/channelList',
      name: 'ChannelList',
      component: () => import('@/views/channel/channelList.vue'),
      meta: {
        title: t('routes.demo.channel.list'),
        ignoreKeepAlive: false,
      },
    },
    {
      path: '/channel/channelStatsList',
      name: 'ChannelStatsList',
      component: () => import('@/views/channel/channelStatsList.vue'),
      meta: {
        title: t('routes.demo.channel.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default channel;
