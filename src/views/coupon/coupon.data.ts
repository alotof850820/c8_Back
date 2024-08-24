import { BasicColumn, FormSchema } from '@/components/Table';
import { computed, h, ref } from 'vue';
import { Input, Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { editCouponsStatus } from '@/api/coupon';

export const columns: BasicColumn[] = [
  {
    title: '優惠券ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 60,
  },
  {
    title: '兌換的門檻金額',
    dataIndex: 'redeemConditionAmount',
    width: 150,
    customRender: ({ record }) => {
      return h(Input, {
        value: record.redeemConditionAmount,
        disabled: true,
        onClick: (e) => {
          e.stopPropagation();
        },
        // onBlur: (value) => {
        //   const target = value.target as HTMLInputElement;
        //   if (+target.value === record.age) return;
        //   if (target) {
        //     const { createMessage } = useMessage();
        //     editGirlAge(record.id, { age: +target.value })
        //       .then(() => {
        //         record.age = +target.value;
        //         createMessage.success('修改年龄成功');
        //       })
        //       .catch(() => {
        //         createMessage.error('修改年龄失败');
        //       });
        //   }
        // },
        // onChange: (value) => {
        //   if (+value.target.value! < 0) {
        //     value.target.value = '0';
        //   }
        // },
        type: 'number',
      });
    },
  },
  {
    title: '有效期限',
    dataIndex: 'validityPeriod',
  },
  {
    title: '優惠券狀態',
    dataIndex: 'state',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.state === 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onClick: (_, e) => {
          e.stopPropagation();
          const { createMessage } = useMessage();
          editCouponsStatus(record.id, { state: record.state === 0 ? 1 : 0 })
            .then(() => {
              record.state = record.state === 0 ? 1 : 0;
              createMessage.success(`已成功修改状态`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const isChange = ref<boolean>(false);

export const addCouponFormSchema = computed<FormSchema[]>(() => [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    defaultValue: '',
    componentProps: {
      maxlength: 50,
    },
  },
  {
    field: 'describe',
    label: '描述',
    component: 'InputTextArea',
    defaultValue: '',
    componentProps: {
      maxlength: 200,
    },
  },
  {
    field: 'disCountRate',
    label: '折扣率',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: 1,
      step: 0.01,
      formatter: (value) => `${(+value).toFixed(2)}%`,
      parser: (value) => parseFloat(value.replace('%', '')),
    },
  },
  {
    field: 'redeemConditionAmount',
    label: '兌換門檻金額',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      precision: 0,
      step: 1,
    },
  },
  {
    field: 'maxDisCountAmount',
    label: '最大折扣金額',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      precision: 0,
      step: 1,
    },
  },
  {
    field: 'maxRedeemCount',
    label: '最大兌換次數',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      precision: 0,
      step: 1,
    },
  },
  {
    field: 'validityPeriod',
    component: 'DatePicker',
    label: '有效期限',
    defaultValue: '',
    required: true,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [
      {
        validator: (value) => {
          if (!value) {
            return Promise.reject('预约日期不能为空');
          } else {
            return Promise.resolve();
          }
        },
      },
    ],
  },
  {
    field: 'sendType',
    label: '優惠券發送類型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '即時', value: 0 },
        { label: '排程', value: 1 },
      ],
      onChange: (val) => {
        if (val.target?.value === 0) {
          isChange.value = false;
        } else if (val.target?.value === 1) {
          isChange.value = true;
        }
      },
    },
  },
  {
    field: 'sendDate',
    component: 'DatePicker',
    label: '發放日期',
    required: isChange.value,
    colProps: {
      span: 24,
    },
    show: isChange.value,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [
      {
        validator: (value) => {
          if (!value) {
            return Promise.reject('發放日期不能为空');
          } else {
            return Promise.resolve();
          }
        },
      },
    ],
  },
]);

export const editCouponDetailFormSchema = computed<FormSchema[]>(() => [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    defaultValue: '',
    componentProps: {
      maxlength: 50,
    },
  },
  {
    field: 'describe',
    label: '描述',
    component: 'InputTextArea',
    defaultValue: '',
    componentProps: {
      maxlength: 200,
    },
  },
  {
    field: 'redeemConditionAmount',
    label: '兌換門檻金額',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      precision: 0,
      step: 1,
    },
  },
  {
    field: 'maxDisCountAmount',
    label: '最大折扣金額',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      precision: 0,
      step: 1,
    },
  },
  {
    field: 'maxRedeemCount',
    label: '最大兌換次數',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      precision: 0,
      step: 1,
    },
  },
  {
    field: 'validityPeriod',
    component: 'DatePicker',
    label: '有效期限',
    defaultValue: '',
    required: true,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [
      {
        validator: (value) => {
          if (!value) {
            return Promise.reject('预约日期不能为空');
          } else {
            return Promise.resolve();
          }
        },
      },
    ],
  },
  {
    field: 'sendType',
    label: '優惠券發送類型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '即時', value: 0 },
        { label: '排程', value: 1 },
      ],
      onChange: (val) => {
        if (val.target?.value === 0) {
          isChange.value = false;
        } else if (val.target?.value === 1) {
          isChange.value = true;
        }
      },
    },
  },
  {
    field: 'sendDate',
    component: 'DatePicker',
    label: '發放日期',
    defaultValue: '',
    required: isChange.value,
    colProps: {
      span: 24,
    },
    show: isChange.value,
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rules: [
      {
        validator: (value) => {
          if (!value) {
            return Promise.reject('發放日期不能为空');
          } else {
            return Promise.resolve();
          }
        },
      },
    ],
  },
  {
    field: 'state',
    label: '優惠券狀態',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '啟用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
  },
]);
