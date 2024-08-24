import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { editUsersStatus } from '@/api/users';
import { useMessage } from '@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '手机号码',
    dataIndex: 'phoneNumber',
    width: 120,
  },
  {
    title: '用户验证状态',
    dataIndex: 'validationStatus',
    width: 180,
    customRender: ({ record }) => {
      return h(
        Tag,
        {
          color: record.validationStatus === 0 ? 'green' : 'red',
        },
        () => (record.validationStatus === 0 ? '已设置密码' : '需设置密码'),
      );
    },
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.userStatus === 0,
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
              editUsersStatus(record.id, { status: record.userStatus === 0 ? 1 : 0 })
                .then(() => {
                  record.userStatus = record.userStatus === 0 ? 1 : 0;
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
  {
    title: '注册时间',
    dataIndex: 'registerDateTime',
  },
  {
    title: '编辑预约',
    helpMessage: '只能查看进行中的预约',
    dataIndex: 'bookingId',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'phoneNumber',
    label: '手机号码',
    component: 'Input',
    colProps: {
      xl: 12,
      xxl: 8,
    },
  },
  {
    field: 'userStatus',
    label: '用户状态',
    component: 'RadioButtonGroup',
    colProps: {
      xl: 12,
      xxl: 8,
    },
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
  {
    field: 'validationStatus',
    label: '用户验证状态',
    component: 'RadioButtonGroup',
    colProps: {
      xl: 12,
      xxl: 8,
    },
    componentProps: {
      options: [
        { label: '已设置密码', value: 0 },
        { label: '需设置密码', value: 1 },
      ],
    },
  },
];
