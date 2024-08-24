import { BasicColumn } from '@/components/Table';
import { Input, Select } from 'ant-design-vue';
import { h } from 'vue';
import { useMessage } from '@/hooks/web/useMessage';
import { editBookingCompletedAmount, editBookingStatus } from '@/api/booking';

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
    title: '完成价格',
    dataIndex: 'completedAmount',
    width: 150,
    customRender: ({ record }) => {
      const noValue = record.status === 2 && record.completedAmount === null;
      return h(Input, {
        value: record.completedAmount,
        status: noValue ? 'error' : '',
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          if (record.completedAmount === target.value) return;
          if (record.completedAmount === null) return;

          if (target) {
            const { createMessage } = useMessage();
            editBookingCompletedAmount(record.id, { completedAmount: +target.value })
              .then(() => {
                record.completedAmount = target.value;
                createMessage.success('修改价格成功');
              })
              .catch(() => {
                createMessage.error('修改价格失败');
              });
          }
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
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
        onChange: (value) => {
          const { createMessage } = useMessage();

          if (value === 2 && record.completedAmount === null) {
            createMessage.error('请先填写完成价格');
            return;
          }
          editBookingStatus(record.id, { status: value as number })
            .then(() => {
              record.status = value;
              createMessage.success('修改预约状态成功');
            })
            .catch(() => {
              createMessage.error('修改预约状态失败');
            });
        },
      });
    },
  },
];
