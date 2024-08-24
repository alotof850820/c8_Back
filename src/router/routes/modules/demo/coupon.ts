import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const coupon: AppRouteModule = {
  path: '/coupon',
  name: 'Coupon',
  component: LAYOUT,
  redirect: '/couponList',
  meta: {
    orderNo: 10000,
    icon: 'ri:coupon-3-fill',
    title: t('routes.demo.coupon.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/coupon/couponList',
      name: 'CouponList',
      component: () => import('@/views/coupon/CouponList.vue'),
      meta: {
        title: t('routes.demo.coupon.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default coupon;
