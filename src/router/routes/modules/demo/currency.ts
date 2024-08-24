import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const currency: AppRouteModule = {
  path: '/currency',
  name: 'Currency',
  component: LAYOUT,
  redirect: '/currencyList',
  meta: {
    orderNo: 3000,
    icon: 'ph:currency-jpy-fill',
    title: t('routes.demo.currency.moduleName'),
    roles: [RoleEnum.SUPER],
    hideMenu: true,
  },
  children: [
    {
      path: '/currency/currencyList',
      name: 'CurrencyList',
      component: () => import('@/views/currency/currencyList.vue'),
      meta: {
        title: t('routes.demo.currency.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default currency;
