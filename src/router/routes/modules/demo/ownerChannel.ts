import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const ownerChannel: AppRouteModule = {
  path: '/ownerChannel',
  name: 'ownerChannel',
  component: LAYOUT,
  redirect: '/ownerChannelStatsList',
  meta: {
    orderNo: 1000,
    icon: 'uil:channel',
    title: t('routes.demo.ownerChannel.moduleName'),
    roles: [RoleEnum.TEST],
  },
  children: [
    {
      path: '/ownerChannel/ownerChannelStatsList',
      name: 'ownerChannelStatsList',
      component: () => import('@/views/ownerChannel/OwnerChannelStatsList.vue'),
      meta: {
        title: t('routes.demo.ownerChannel.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default ownerChannel;
