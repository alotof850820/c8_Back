import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const product: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/productList',
  meta: {
    orderNo: 3000,
    icon: 'fluent-mdl2:product-list',
    title: t('routes.demo.product.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/product/productList',
      name: 'ProductList',
      component: () => import('@/views/product/ProductList.vue'),
      meta: {
        title: t('routes.demo.product.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default product;
