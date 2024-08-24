import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const mine: AppRouteModule = {
  path: '/mineSetting',
  name: 'mineSetting',
  component: LAYOUT,
  redirect: '/mineSetting/MineManage',
  meta: {
    orderNo: 2000000,
    icon: 'bxs:user',
    title: t('routes.demo.mine.moduleName'),
  },
  children: [
    {
      path: 'MineManage',
      name: 'MineManage',
      component: () => import('@/views/mine/MineManage.vue'),
      meta: {
        title: t('routes.demo.mine.mineList'),
      },
    },
    {
      path: 'MineManage/editPassword',
      name: 'EditPassword',
      component: () => import('@/views/mine/EditPassword.vue'),
      meta: {
        title: t('routes.demo.mine.editPassword'),
      },
    },
  ],
};

export default mine;
