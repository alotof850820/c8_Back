import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const girls: AppRouteModule = {
  path: '/girls',
  name: 'Girls',
  component: LAYOUT,
  redirect: '/girlsList',
  meta: {
    orderNo: 2000,
    icon: 'icon-park-outline:girl-two',
    title: t('routes.demo.girls.moduleName'),
    roles: [RoleEnum.SUPER],
    hideMenu: true,
  },
  children: [
    {
      path: '/girls/girlsList',
      name: 'GirlsList',
      component: () => import('@/views/girls/girlsList.vue'),
      meta: {
        title: t('routes.demo.girls.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default girls;
