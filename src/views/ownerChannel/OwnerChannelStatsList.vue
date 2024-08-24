<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getChannelsOwnerDialyStats } from '@/api/channel';
  import { ref } from 'vue';

  const targetMonth = ref(0);

  const [registerTable, { reload, getForm }] = useTable({
    title: '渠道统计列表',
    api: getChannelsOwnerDialyStats,
    beforeFetch: (params) => {
      const data = params.date ? new Date(params.date) : new Date();
      targetMonth.value = data.getMonth() + 1;

      params = {
        date: params.date ? params.date : new Date(),
      };
      return params;
    },
    columns: [
      {
        title: '日期',
        dataIndex: 'date',
        fixed: 'left',
      },
      {
        title: '注册数',
        dataIndex: 'registerCount',
        key: 'registerCount',
      },
      {
        title: '总预约数',
        dataIndex: 'totalBookingCount',
        key: 'totalBookingCount',
      },
      {
        title: '已完成预约数',
        dataIndex: 'completedBookingCount',
        key: 'completedBookingCount',
      },
      {
        title: '待确认预约数',
        dataIndex: 'pendingBookingCount',
        key: 'pendingBookingCount',
      },
      {
        title: '进行中预约数',
        dataIndex: 'inProgressBookingCount',
        key: 'inProgressBookingCount',
      },
      {
        title: '已取消预约数',
        dataIndex: 'canceledBookingCount',
        key: 'canceledBookingCount',
      },
      {
        title: '累积分红',
        dataIndex: 'dividendRevenue',
        key: 'dividendRevenue',
      },
    ],
    showSummary: true,
    canResize: false,
    summaryFunc: (data) => {
      const totalDividend = data
        .reduce((prev, next) => {
          return prev + (next.dividendRevenue || 0);
        }, 0)
        .toFixed(2);
      const totalCanceledBookingCount = data.reduce((prev, next) => {
        return prev + (next.canceledBookingCount || 0);
      }, 0);
      const totalBookingCount = data.reduce((prev, next) => {
        return prev + (next.totalBookingCount || 0);
      }, 0);
      const totalCompletedBookingCount = data.reduce((prev, next) => {
        return prev + (next.completedBookingCount || 0);
      }, 0);

      const totalPendingBookingCount = data.reduce((prev, next) => {
        return prev + (next.pendingBookingCount || 0);
      }, 0);

      const totalInProgressBookingCount = data.reduce((prev, next) => {
        return prev + (next.inProgressBookingCount || 0);
      }, 0);

      const totalRegisterCount = data.reduce((prev, next) => {
        return prev + (next.registerCount || 0);
      }, 0);

      return [
        {
          date: `${targetMonth.value}月合计：`,
          dividendRevenue: `总分红: ${totalDividend}`,
          canceledBookingCount: `总取消预约数: ${totalCanceledBookingCount}`,
          totalBookingCount: `总预约数: ${totalBookingCount}`,
          completedBookingCount: `总已完成预约数: ${totalCompletedBookingCount}`,
          pendingBookingCount: `总待确认预约数: ${totalPendingBookingCount}`,
          inProgressBookingCount: `总进行中预约数: ${totalInProgressBookingCount}`,
          registerCount: `总注册数: ${totalRegisterCount}`,
        },
      ];
    },
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    formConfig: {
      labelWidth: 0,
      schemas: [
        {
          field: 'date',
          label: '日期',
          component: 'DatePicker',
          colProps: {
            span: 9,
          },
          componentProps: {
            picker: 'month',
            format: 'YYYY-MM',
            placeholder: '请选择年月',
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
