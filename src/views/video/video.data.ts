import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Avatar, Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { editVideoState } from '@/api/video';

export const columns: BasicColumn[] = [
  {
    title: '影片ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '用戶',
    dataIndex: 'user',
    width: 180,
    customRender: ({ record }) => {
      return h(
        'div',
        {
          style: 'display: flex; align-items: center; justify-content: center; gap: 10px',
        },
        {
          default: () => [
            h(Avatar, {
              src: record.user.imageUrl,
              style: 'width: 60px; height: 60px; border-radius: 50%;',
            }),
            h(
              'div',
              {
                style:
                  'display: flex; flex-direction: column; align-items: center; justify-content: center;',
              },
              {
                default: () => [h('span', record.user.name), h('span', `用戶ID:${record.user.id}`)],
              },
            ),
          ],
        },
      );
    },
  },
  {
    title: '標題',
    dataIndex: 'title',
    width: 120,
    customRender: ({ record }) => {
      return h(
        'div',
        {},
        {
          default: () => record.title,
        },
      );
    },
  },
  {
    title: '片長',
    dataIndex: 'duration',
    width: 120,
    customRender: ({ record }) => {
      return h(
        'div',
        {},
        {
          default: () => new Date(record.duration * 1000).toISOString().substr(14, 5),
        },
      );
    },
  },
  // {
  //   title: '头像',
  //   dataIndex: 'imageUrl',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     return h(ImageUpload, {
  //       value: record.imageUrl ? [record.imageUrl] : [],
  //       api: () => {
  //         return Promise.resolve({
  //           url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
  //         });
  //       },
  //       onChange: (value) => {
  //         const formData = new FormData();
  //         const data = {
  //           image: value[0].originFileObj,
  //         };
  //         for (const key of Object.keys(data)) {
  //           if (Array.isArray(data[key])) {
  //             data[key].forEach((item: string, index) => {
  //               formData.append(`${key}[${index}]`, item);
  //             });
  //           } else if (data[key] !== null) {
  //             formData.append(key, data[key]);
  //           }
  //         }
  //         patchUserImage(record.id, formData);
  //       },
  //       onClick: (e) => {
  //         e.stopPropagation();
  //       },
  //     });
  //   },
  // },
  {
    title: '上傳時間',
    dataIndex: 'uploadTime',
    width: 120,
  },
  {
    title: '影片狀態',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onClick: (_, event) => {
          event.stopPropagation();
          const { createMessage } = useMessage();
          const { createConfirm } = useMessage();
          createConfirm({
            iconType: 'warning',
            title: () => h('span', '系统提示'),
            content: () => h('span', '确认变更状态吗?'),
            onOk: async () => {
              editVideoState(record.id, { status: record.status === 0 ? 1 : 0 })
                .then(() => {
                  record.status = record.status === 0 ? 1 : 0;
                  createMessage.success(`已成功修改用户状态`);
                })
                .catch(() => {
                  createMessage.error('修改用户状态失败');
                })
                .finally(() => {
                  record.pendingStatus = false;
                });
            },
          });
        },
      });
    },
  },
];

export const addVideoFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用戶ID',
    component: 'Input',
    defaultValue: 0,
    required: true,
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'title',
    label: '標題',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 50,
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      maxlength: 1000,
    },
  },
  {
    field: 'coverPath',
    label: '預覽圖',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      onChange: (val) => {
        return val.originFileObj;
      },
    },
  },
  {
    field: 'videoPath',
    label: '影片',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      onChange: (val) => {
        return val.originFileObj;
      },
    },
  },
  {
    field: 'previewPath',
    label: '影片預覽圖',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      onChange: (val) => {
        return val.originFileObj;
      },
    },
  },
  {
    field: 'tags',
    label: '標籤',
    component: 'Select',
    required: true,
    componentProps: {
      mode: 'tags',
      // options: [
      //   { label: '免費', value: 0 },
      //   { label: '廣告', value: 1 },
      //   { label: '收費', value: 2 },
      // ],
    },
  },
  {
    field: 'sexType',
    label: '性取向',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '男男', value: 0 },
        { label: '女女', value: 1 },
        { label: '男女', value: 2 },
      ],
    },
  },
  {
    field: 'type',
    label: '影片類型',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '免費', value: 0 },
        { label: '廣告', value: 1 },
        { label: '收費', value: 2 },
      ],
    },
  },
];

export const videoDetailFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '標題',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 50,
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      maxlength: 1000,
    },
  },
  {
    field: 'status',
    label: '影片狀態',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '啟用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
  {
    field: 'sexType',
    label: '性取向',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '男男', value: 0 },
        { label: '女女', value: 1 },
        { label: '男女', value: 2 },
      ],
    },
  },
  {
    field: 'type',
    label: '影片類型',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '免費', value: 0 },
        { label: '廣告', value: 1 },
        { label: '收費', value: 2 },
      ],
    },
  },
  {
    field: 'tags',
    label: '標籤',
    component: 'Select',
    required: true,
    componentProps: {
      mode: 'tags',
      // options: [
      //   { label: '免費', value: 0 },
      //   { label: '廣告', value: 1 },
      //   { label: '收費', value: 2 },
      // ],
    },
  },
];

// export const searchFormSchema: FormSchema[] = [
//   {
//     field: 'phoneNumber',
//     label: '手机号码',
//     component: 'Input',
//     colProps: {
//       xl: 12,
//       xxl: 8,
//     },
//   },
//   {
//     field: 'status',
//     label: '用户状态',
//     component: 'RadioButtonGroup',
//     colProps: {
//       xl: 12,
//       xxl: 8,
//     },
//     componentProps: {
//       options: [
//         { label: '启用', value: 0 },
//         { label: '禁用', value: 1 },
//       ],
//     },
//   },
//   {
//     field: 'validationStatus',
//     label: '用户验证状态',
//     component: 'RadioButtonGroup',
//     colProps: {
//       xl: 12,
//       xxl: 8,
//     },
//     componentProps: {
//       options: [
//         { label: '已设置密码', value: 0 },
//         { label: '需设置密码', value: 1 },
//       ],
//     },
//   },
// ];
