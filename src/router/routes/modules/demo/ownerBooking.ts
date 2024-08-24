import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const ownerBooking: AppRouteModule = {
  path: '/ownerBooking',
  name: 'ownerBooking',
  component: LAYOUT,
  redirect: '/ownerBookingList',
  meta: {
    orderNo: 5000,
    icon: 'tabler:brand-booking',
    title: t('routes.demo.booking.moduleName'),
    roles: [RoleEnum.TEST],
  },
  children: [
    {
      path: '/ownerBooking/ownerBookingList',
      name: 'ownerBookingList',
      component: () => import('@/views/ownerBooking/OwnerBookingList.vue'),
      meta: {
        title: t('routes.demo.booking.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default ownerBooking;
