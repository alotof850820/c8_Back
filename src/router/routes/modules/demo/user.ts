import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/userList',
  meta: {
    orderNo: 1000,
    icon: 'bx:user',
    title: t('routes.demo.user.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/user/userList',
      name: 'UserList',
      component: () => import('@/views/user/userList.vue'),
      meta: {
        title: t('routes.demo.user.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default user;
