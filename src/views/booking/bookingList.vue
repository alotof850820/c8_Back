<template>
  <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './booking.data';
  import { getBooking } from '@/api/booking';

  const [registerTable, { reload, getForm }] = useTable({
    title: '预约列表',
    maxHeight: 600,
    api: getBooking,
    beforeFetch: (params) => {
      // const phoneNumber = router.currentRoute.value.query.phoneNumber;
      // getForm().setFieldsValue({ phoneNumber });
      params = {
        ...params,
        pageIndex: params.page,
        pageSize: 10,
      };
      return params;
    },
    columns: columns,
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    formConfig: {
      labelWidth: 100,
      schemas: [
        {
          field: 'phoneNumber',
          component: 'Input',
          label: '完整手机号',
          colProps: {
            span: 10,
          },
        },
        {
          field: 'status',
          component: 'Select',
          label: '状态',
          colProps: {
            span: 8,
          },
          componentProps: {
            options: [
              { label: '未完成', value: 0 },
              { label: '已完成', value: 1 },
              { label: '已取消', value: 2 },
            ],
          },
        },
      ],
      autoSubmitOnEnter: true,
      submitFunc: async () => {
        const searchInput = getForm().getFieldsValue();
        reload({
          searchInfo: searchInput,
          page: 1,
        });
      },
    },
    useSearchForm: true,
  });
</script>

<style></style>
