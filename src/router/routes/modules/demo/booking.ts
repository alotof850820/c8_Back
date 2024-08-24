import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const booking: AppRouteModule = {
  path: '/booking',
  name: 'Booking',
  component: LAYOUT,
  redirect: '/bookingList',
  meta: {
    orderNo: 5000,
    icon: 'tabler:brand-booking',
    title: t('routes.demo.booking.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/booking/bookingList',
      name: 'BookingList',
      component: () => import('@/views/booking/bookingList.vue'),
      meta: {
        title: t('routes.demo.booking.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default booking;
