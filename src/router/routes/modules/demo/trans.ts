import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const trans: AppRouteModule = {
  path: '/trans',
  name: 'Trans',
  component: LAYOUT,
  redirect: '/transList',
  meta: {
    orderNo: 12000,
    icon: 'ri:coupon-3-fill',
    title: t('routes.demo.trans.moduleName'),
    roles: [RoleEnum.SUPER],
    hideMenu: true,
  },
  // children: [
  //   {
  //     path: '/trans/transList',
  //     name: 'TransList',
  //     component: () => import('@/views/trans/TransList.vue'),
  //     meta: {
  //       title: t('routes.demo.trans.customerCell'),
  //       ignoreKeepAlive: false,
  //     },
  //   },
  // ],
};

export default trans;
