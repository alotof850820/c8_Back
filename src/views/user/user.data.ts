import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { editUsersStatus, patchUserImage } from '@/api/users';
import { useMessage } from '@/hooks/web/useMessage';
import { ImageUpload } from '@/components/Upload';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
    customRender: ({ record }) => {
      return h(
        'div',
        {},
        {
          default: () => record.email,
        },
      );
    },
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    width: 120,
    customRender: ({ record }) => {
      return h(
        'div',
        {},
        {
          default: () => record.userName,
        },
      );
    },
  },
  {
    title: '头像',
    dataIndex: 'imageUrl',
    width: 120,
    customRender: ({ record }) => {
      return h(ImageUpload, {
        value: record.imageUrl ? [record.imageUrl] : [],
        api: () => {
          return Promise.resolve({
            url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
          });
        },
        onChange: (value) => {
          const formData = new FormData();
          const data = {
            image: value[0].originFileObj,
          };
          for (const key of Object.keys(data)) {
            if (Array.isArray(data[key])) {
              data[key].forEach((item: string, index) => {
                formData.append(`${key}[${index}]`, item);
              });
            } else if (data[key] !== null) {
              formData.append(key, data[key]);
            }
          }
          patchUserImage(record.id, formData);
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
  {
    title: '性取向',
    dataIndex: 'sexType',
    width: 120,
    customRender: ({ record }) => {
      return h(
        Tag,
        { color: record.sexType === 0 ? 'green' : record.sexType === 1 ? 'pink' : 'orange' },
        () => (record.sexType === 0 ? '男男' : record.sexType === 1 ? '女女' : '男女'),
      );
    },
  },
  {
    title: '用户状态',
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
              editUsersStatus(record.id, { status: record.status === 0 ? 1 : 0 })
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

export const addUserFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 20,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    componentProps: {
      maxlength: 20,
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 50,
    },
    rules: [
      {
        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '邮箱格式不正确',
      },
    ],
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
    label: '用户类型',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '一般會員', value: 0 },
        { label: '主播', value: 1 },
      ],
    },
  },
  {
    field: 'introduction',
    label: '描述',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      maxlength: 1000,
    },
  },
  {
    field: 'imagePath',
    label: '头像',
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
    field: 'backGroundPath',
    label: '背景圖',
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
];

export const userDetailFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 20,
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    required: true,
    componentProps: {
      maxlength: 50,
    },
    rules: [
      {
        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: '邮箱格式不正确',
      },
    ],
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
    label: '用户类型',
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '一般會員', value: 0 },
        { label: '主播', value: 1 },
      ],
    },
  },
  {
    field: 'introduction',
    label: '描述',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      maxlength: 1000,
    },
  },
  {
    field: 'status',
    label: '用戶狀態',
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
    field: 'imageUrl',
    label: '头像',
    component: 'ImageUpload',
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
      disabled: true,
    },
  },
  {
    field: 'backGroundUrl',
    label: '背景圖',
    component: 'ImageUpload',
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
      disabled: true,
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
