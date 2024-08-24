import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const home: AppRouteModule = {
  path: '/homes',
  name: 'homes',
  component: LAYOUT,
  redirect: '/homes/articlesManage',
  meta: {
    orderNo: 7000,
    icon: 'arcticons:adguard-home-manager',
    title: t('routes.demo.home.moduleName'),
    roles: [RoleEnum.SUPER],
    hideMenu: true,
  },
  children: [
    {
      path: 'articlesManage',
      name: 'ArticlesManage',
      component: () => import('@/views/home/ArticlesManage.vue'),
      meta: {
        title: t('routes.demo.home.customerCell'),
      },
    },
  ],
};

export default home;
