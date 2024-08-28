<template>
  <div>
    <BasicModal v-bind="$attrs" @register="registerModal" title="金幣更動紀錄">
      <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getTrans } from '@/api/users';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';

  const userId = ref(0);
  const [registerModal] = useModalInner(async (data) => {
    reload();
    userId.value = data.id;
  });
  const [registerTable, { reload }] = useTable({
    api: getTrans,
    maxHeight: 600,
    beforeFetch: (params) => {
      params = {
        userId: userId.value,
        pageIndex: params.page,
        pageSize: 10,
      };
      return params;
    },
    columns: [
      {
        title: '金幣更動ID',
        dataIndex: 'id',
        width: 80,
      },
      {
        title: '更動金額',
        dataIndex: 'changeAmount',
      },
      {
        title: '更動類型',
        dataIndex: 'changeType',
      },
      {
        title: '更動日期',
        dataIndex: 'changeDateTime',
      },
    ],
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
  });
</script>

<style></style>
