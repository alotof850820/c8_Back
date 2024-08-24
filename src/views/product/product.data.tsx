import { BasicColumn, FormSchema } from '@/components/Table';
import { computed, ComputedRef, h, ref } from 'vue';
import { Input, Switch, Tag } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import {
  editProductAmount,
  editProductName,
  editProductPoint,
  editProductStatus,
} from '@/api/product';

export const columns: BasicColumn[] = [
  {
    title: '商品ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '名称',
    dataIndex: 'name',
    minWidth: 150,
    customRender: ({ record }) => {
      return h(Input, {
        value: record.name,
        onBlur: (e: any) => {
          if (record.name === e.target.value) return;
          editProductName(record.id, { name: e.target?.value?.toString() || '' })
            .then(() => {
              record.name = e.target.value;
              const { createMessage } = useMessage();
              createMessage.success('编辑成功');
            })
            .then(() => {
              const { createMessage } = useMessage();
              createMessage.error('编辑失败');
            });
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
  {
    title: '介绍',
    dataIndex: 'introduce',
    minWidth: 200,
    customRender: ({ record }) => {
      return h('span', {}, record.introduce || '-');
    },
  },
  {
    title: '商品金额',
    dataIndex: 'amount',
    minWidth: 200,
    helpMessage: '商品类型为充值时，金额为人民币，商品类型为预约包时，金额为点数',
    customRender: ({ record }) => {
      const handleBlur = async (e: any) => {
        const { createMessage } = useMessage();
        try {
          if (record.amount === +e.target.value) return;
          await editProductAmount(record.id, { amount: e.target?.value?.toString() || '' });
          record.amount = e.target.value;
          createMessage.success('编辑成功');
        } catch (error) {
          createMessage.error('编辑失败');
        }
      };
      const handleClick = (e: any) => {
        e.stopPropagation();
      };
      return (
        <div style="display: flex; align-items: center; gap: 4px">
          <Input value={record.amount} onBlur={handleBlur} onClick={handleClick} />
          <div style="white-space: nowrap"> 人民币</div>
        </div>
      );
    },
  },
  {
    title: '商品点数',
    dataIndex: 'point',
    minWidth: 200,
    customRender: ({ record }) => {
      const handleBlur = async (e: any) => {
        const { createMessage } = useMessage();
        try {
          if (record.point === +e.target.value) return;
          await editProductPoint(record.id, { point: +e.target?.value || 0 });
          record.point = +e.target.value;
          createMessage.success('编辑成功');
        } catch (error) {
          createMessage.error('编辑失败');
        }
      };
      const handleClick = (e: any) => {
        e.stopPropagation();
      };
      return (
        <div style="display: flex; align-items: center; gap: 4px">
          <Input value={record.point} onBlur={handleBlur} onClick={handleClick} />
          <div style="white-space: nowrap"> 点数</div>
        </div>
      );
    },
  },
  {
    title: '商品类型',
    dataIndex: 'type',
    minWidth: 60,
    customRender: ({ record }) => {
      return h(Tag, {}, () => {
        if (record.type === 0) {
          return '充值';
        } else if (record.type === 1) {
          return '预约包';
        }
      });
    },
  },
  {
    title: '商品状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '上架',
        unCheckedChildren: '下架',
        loading: record.pendingStatus,
        onClick: (_, e) => {
          e.stopPropagation();
          const { createMessage } = useMessage();
          editProductStatus(record.id, { status: record.status === 0 ? 1 : 0 })
            .then(() => {
              record.status = record.status === 0 ? 1 : 0;
              createMessage.success(`已成功修改商品状态`);
            })
            .catch(() => {
              createMessage.error('修改商品状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商品名称',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'type',
    label: '商品类型',
    component: 'RadioButtonGroup',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        { label: '充值', value: 0 },
        { label: '预约包', value: 1 },
      ],
    },
  },
  {
    field: 'status',
    label: '商品状态',
    component: 'RadioButtonGroup',
    colProps: {
      span: 7,
    },
    componentProps: {
      options: [
        { label: '上架', value: 0 },
        { label: '下架', value: 1 },
      ],
    },
  },
];

export const productType = ref(1);

export const productFormSchema: ComputedRef<FormSchema[]> = computed(() =>
  productType.value === 0
    ? [
        {
          field: 'name',
          label: '名称',
          component: 'Input',
          required: true,
          defaultValue: '',
        },
        {
          field: 'introduce',
          label: '介绍',
          component: 'InputTextArea',
          defaultValue: '',
          componentProps: {
            maxlength: 200,
          },
          colProps: {
            span: 20,
          },
        },
        {
          field: 'amount',
          label: '商品金额',
          component: 'InputNumber',
          helpMessage: '商品类型为充值时，金额为人民币，商品类型为预约包时，金额为点数',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 12,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'point',
          label: '点数',
          component: 'InputNumber',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 12,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'status',
          label: '商品状态',
          component: 'RadioButtonGroup',
          defaultValue: 0,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              { label: '上架', value: 0 },
              { label: '下架', value: 1 },
            ],
          },
        },
        {
          field: 'type',
          label: '商品类型',
          component: 'RadioButtonGroup',
          defaultValue: 1,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              // { label: '充值', value: 0 },
              { label: '预约包', value: 1 },
            ],
            onChange: (value) => {
              productType.value = +value;
            },
          },
        },
        // {
        //   field: 'productPoint',
        //   label: '商品点数',
        //   component: 'InputNumber',
        //   required: true,
        //   componentProps: {
        //     min: 0,
        //   },
        //   helpMessage: '商品类型为充值时必填',
        // },
      ]
    : [
        {
          field: 'name',
          label: '名称',
          component: 'Input',
          required: true,
          defaultValue: '',
        },
        {
          field: 'introduce',
          label: '介绍',
          component: 'InputTextArea',
          defaultValue: '',
          componentProps: {
            maxlength: 200,
          },
          colProps: {
            span: 20,
          },
        },
        {
          field: 'amount',
          label: '商品金额',
          component: 'InputNumber',
          helpMessage: '商品类型为充值时，金额为人民币，商品类型为预约包时，金额为点数',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 12,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'point',
          label: '点数',
          component: 'InputNumber',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 12,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'status',
          label: '商品状态',
          component: 'RadioButtonGroup',
          defaultValue: 0,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              { label: '上架', value: 0 },
              { label: '下架', value: 1 },
            ],
          },
        },
        {
          field: 'type',
          label: '商品类型',
          component: 'RadioButtonGroup',
          defaultValue: 1,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              // { label: '充值', value: 0 },
              { label: '预约包', value: 1 },
            ],
            onChange: (value) => {
              productType.value = +value;
            },
          },
        },
        {
          field: 'bookingTime',
          label: '预约次数或年限长度',
          component: 'InputNumber',
          labelWidth: 170,
          required: true,
          defaultValue: 0,
          componentProps: {
            min: 0,
          },
          helpMessage: '商品类型为预约包时必填',
        },
        {
          field: 'bookingType',
          label: '预约类型',
          component: 'RadioButtonGroup',
          helpMessage: '商品类型为预约包时必填',
          defaultValue: 0,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          required: true,
          componentProps: {
            options: [
              { label: '次数', value: 0 },
              { label: '包年', value: 1 },
            ],
          },
        },
      ],
);
export const editProductDetailFormSchema: ComputedRef<FormSchema[]> = computed(() =>
  productType.value === 0
    ? [
        {
          field: 'name',
          label: '名称',
          component: 'Input',
          required: true,
          defaultValue: '',
        },
        {
          field: 'introduce',
          label: '介绍',
          component: 'InputTextArea',
          defaultValue: '',
          componentProps: {
            maxlength: 200,
          },
          colProps: {
            span: 20,
          },
        },
        {
          field: 'amount',
          label: '商品金额',
          component: 'InputNumber',
          helpMessage: '商品类型为充值时，金额为人民币，商品类型为预约包时，金额为点数',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 7,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'point',
          label: '点数',
          component: 'InputNumber',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 12,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'status',
          label: '商品状态',
          component: 'RadioButtonGroup',
          defaultValue: 0,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              { label: '上架', value: 0 },
              { label: '下架', value: 1 },
            ],
          },
        },
        {
          field: 'type',
          label: '商品类型',
          labelWidth: 0,
          component: 'RadioButtonGroup',
          defaultValue: 1,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              // { label: '充值', value: 0 },
              { label: '预约包', value: 1 },
            ],
            onChange: (value) => {
              productType.value = +value;
            },
          },
        },
        // {
        //   field: 'productPoint',
        //   label: '商品点数',
        //   component: 'InputNumber',
        //   required: true,
        //   defaultValue: 0,
        //   componentProps: {
        //     min: 0,
        //   },
        //   helpMessage: '商品类型为充值时必填',
        // },
      ]
    : [
        {
          field: 'name',
          label: '名称',
          component: 'Input',
          required: true,
          defaultValue: '',
        },
        {
          field: 'introduce',
          label: '介绍',
          component: 'InputTextArea',
          defaultValue: '',
          componentProps: {
            maxlength: 200,
          },
          colProps: {
            span: 20,
          },
        },
        {
          field: 'amount',
          label: '商品金额',
          component: 'InputNumber',
          helpMessage: '商品类型为充值时，金额为人民币，商品类型为预约包时，金额为点数',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 7,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'point',
          label: '点数',
          component: 'InputNumber',
          required: true,
          defaultValue: 0,
          colProps: {
            span: 12,
          },
          componentProps: {
            min: 0,
            precision: 2,
          },
        },
        {
          field: 'status',
          label: '商品状态',
          component: 'RadioButtonGroup',
          defaultValue: 0,
          componentProps: {
            options: [
              { label: '上架', value: 0 },
              { label: '下架', value: 1 },
            ],
          },
        },
        {
          field: 'type',
          label: '商品类型',
          component: 'RadioButtonGroup',
          defaultValue: 1,
          colProps: {
            xl: 12,
            xxl: 8,
          },
          componentProps: {
            options: [
              // { label: '充值', value: 0 },
              { label: '预约包', value: 1 },
            ],
            onChange: (value) => {
              productType.value = +value;
            },
          },
        },
        {
          field: 'bookingTime',
          label: '预约次数或年限长度',
          component: 'InputNumber',
          labelWidth: 170,
          required: true,
          componentProps: {
            min: 0,
          },
          helpMessage: '商品类型为预约包时必填',
        },
        {
          field: 'bookingType',
          label: '预约类型',
          component: 'RadioButtonGroup',
          helpMessage: '商品类型为预约包时必填',
          colProps: {
            xl: 12,
            xxl: 8,
          },
          required: true,
          componentProps: {
            options: [
              { label: '次数', value: 0 },
              { label: '包年', value: 1 },
            ],
          },
        },
      ],
);
