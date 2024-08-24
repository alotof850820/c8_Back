<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">创建優惠券</a-button>
      </template>
    </BasicTable>
    <GirlsModal @register="registerModal" @success="reload()" />
    <GirlDetailModal @register="registerDetailModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import GirlsModal from './CouponModal.vue';
  import GirlDetailModal from './CouponDetailModal.vue';
  import { useModal } from '@/components/Modal';
  import { getCoupons } from '@/api/coupon';
  import { columns } from './video.data';

  const [registerModal, { openModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '影片列表',
    api: getCoupons,
    maxHeight: 600,
    beforeFetch: (params) => {
      params = {
        pageIndex: params.page,
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
    rowKey: 'id',
    customRow: (record) => {
      return {
        onClick: () => {
          openDetailModal(true, record);
        },
        style: {
          cursor: 'pointer',
        },
      };
    },
  });
</script>

<style></style>
