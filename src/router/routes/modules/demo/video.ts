import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const video: AppRouteModule = {
  path: '/video',
  name: 'Video',
  component: LAYOUT,
  redirect: '/videoList',
  meta: {
    orderNo: 13000,
    icon: 'mingcute:video-fill',
    title: t('routes.demo.video.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/video/videoList',
      name: 'VideoList',
      component: () => import('@/views/video/VideoList.vue'),
      meta: {
        title: t('routes.demo.video.customerCell'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default video;
