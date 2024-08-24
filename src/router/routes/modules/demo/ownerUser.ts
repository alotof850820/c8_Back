import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const ownerUser: AppRouteModule = {
  path: '/ownerUser',
  name: 'ownerUser',
  component: LAYOUT,
  redirect: '/ownerUserList',
  meta: {
    orderNo: 1000,
    icon: 'bx:user',
    title: t('routes.demo.user.moduleName'),
    roles: [RoleEnum.TEST],
  },
  children: [
    {
      path: '/ownerUser/ownerUserList',
      name: 'ownerUserList',
      component: () => import('@/views/ownerUser/OwnerUserList.vue'),
      meta: {
        title: t('routes.demo.user.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default ownerUser;
