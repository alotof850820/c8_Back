import { BasicColumn } from '@/components/Table';
import { Select } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '预约ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '手机号码',
    dataIndex: 'phoneNumber',
    width: 120,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: 180,
    customRender: ({ record }) => {
      return record.name || '-';
    },
  },
  {
    title: '女优名称列表',
    dataIndex: 'actresses',
    width: 200,
    customRender: ({ record }) => {
      return record.actresses.join('、') || '-';
    },
  },
  {
    title: '自定女优名称列表',
    dataIndex: 'definedActresses',
    width: 200,
    customRender: ({ record }) => {
      return record.definedActresses.join('、') || '-';
    },
  },
  {
    title: '约会日期',
    dataIndex: 'meetingDate',
    width: 120,
    sorter: (a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime(),
  },
  {
    title: '约会天数',
    dataIndex: 'meetingDuration',
    width: 100,
    sorter: (a, b) => a.meetingDuration - b.meetingDuration,
  },
  {
    title: '约会城市',
    dataIndex: 'city',
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
    customRender: ({ record }) => {
      return record.remark || '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    sorter: (a, b) => a.status - b.status,
    customRender: ({ record }) => {
      return h(Select, {
        value: record.status,
        options: [
          { label: '待确认', value: 0 },
          { label: '进行中', value: 1 },
          { label: '已完成', value: 2 },
          { label: '已取消', value: 3 },
        ],
        disabled: true,
      });
    },
  },
];
