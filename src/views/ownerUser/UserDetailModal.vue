<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      title="用户预约详情"
      :showCancelBtn="false"
      :show-ok-btn="false"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getCities, getOwnerBookingDetail } from '@/api/booking';
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';

  const [registerForm, { resetFields, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: [
      {
        field: 'id',
        component: 'Input',
        label: '预约ID',
        colProps: {
          span: 24,
        },
        render: (curVal) => {
          return h('div', curVal.model.id);
        },
      },
      {
        field: 'meetingDate',
        component: 'DatePicker',
        label: '预约日期',
        colProps: {
          span: 24,
        },
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
          disabled: true,
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
        field: 'meetingDuration',
        component: 'Input',
        label: '预约天数',
        colProps: {
          span: 24,
        },
        componentProps: {
          type: 'number',
          disabled: true,
        },
        rules: [
          {
            validator: (rule, value) => {
              if (value <= 0) {
                return Promise.reject('预约天数必须大于0');
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
      },
      {
        field: 'dateCityId',
        component: 'ApiSelect',
        label: '预约城市',
        colProps: {
          span: 24,
        },
        componentProps: {
          api: () => getCities(),
          resultField: 'name',
          labelField: 'name',
          valueField: 'id',
          disabled: true,
        },
      },
      {
        field: 'remark',
        component: 'InputTextArea',
        label: '备注',
        colProps: {
          span: 24,
        },
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'type',
        component: 'RadioButtonGroup',
        label: '预约类型',
        colProps: {
          span: 24,
        },
        componentProps: {
          options: [
            { label: '次数预约', value: 0 },
            { label: '包年预约', value: 1 },
          ],
          disabled: true,
        },
      },
      {
        field: 'status',
        component: 'Select',
        label: '预约状态',
        colProps: {
          span: 24,
        },
        componentProps: {
          options: [
            { label: '待确认', value: 0 },
            { label: '进行中', value: 1 },
            { label: '已完成', value: 2 },
            { label: '已取消', value: 3 },
          ],
          disabled: true,
        },
      },
      {
        field: 'actresses',
        component: 'Input',
        label: '女优列表：',
        colProps: {
          span: 24,
        },
        componentProps: {
          readonly: true,
        },
        render(curVal) {
          const tags = curVal.model.actresses?.map((item) => {
            return h(Tag, { key: item, color: 'pink' }, item);
          });
          return tags?.length ? tags : '-';
        },
      },
      {
        field: 'definedActresses',
        component: 'Input',
        label: '自定义女优：',
        colProps: {
          span: 30,
        },
        componentProps: {
          readonly: true,
        },
        render(curVal) {
          const tags = curVal.model.definedActresses?.map((item) => {
            return h(Tag, { key: item, color: 'rgb(245 158 11)' }, item);
          });
          return tags?.length ? tags : '-';
        },
      },
    ],
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal] = useModalInner(async (data) => {
    resetFields();
    const res = await getOwnerBookingDetail(data.bookingId);
    setFieldsValue({
      ...res,
    });
  });
</script>
