import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const tag: AppRouteModule = {
  path: '/tag',
  name: 'Tag',
  component: LAYOUT,
  redirect: '/tagList',
  meta: {
    orderNo: 11000,
    icon: 'ri:coupon-3-fill',
    title: t('routes.demo.tag.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/tag/tagList',
      name: 'TagList',
      component: () => import('@/views/tag/TagList.vue'),
      meta: {
        title: t('routes.demo.tag.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default tag;
