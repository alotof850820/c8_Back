<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
    <StatsModal @register="registerModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getChannelsStats } from '@/api/channel';
  import { useModal } from '@/components/Modal';
  import StatsModal from './StatsModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '渠道统计列表',
    api: getChannelsStats,
    beforeFetch: (params) => {
      params = {
        ...params,
        pageIndex: params.page,
        pageSize: 10,
      };
      return params;
    },
    columns: [
      {
        title: '渠道ID',
        dataIndex: 'id',
        width: 60,
        fixed: 'left',
      },
      {
        title: '渠道NID',
        dataIndex: 'nid',
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
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
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
          id: '合计：',
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
    rowKey: 'id',
    customRow: (record) => {
      return {
        onClick: () => {
          openModal(true, record);
        },
        style: {
          cursor: 'pointer',
        },
      };
    },
  });
</script>

<style></style>
