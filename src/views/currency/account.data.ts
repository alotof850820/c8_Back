import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '币别ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '币别代码',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '币别名称',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '汇率',
    dataIndex: 'exchangeRate',
    width: 120,
  },
];
