<template>
  <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './account.data';
  import { getCurrency } from '@/api/currency';

  const [registerTable] = useTable({
    title: '币别列表',
    api: getCurrency,
    maxHeight: 600,
    beforeFetch: (params) => {
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
  });
</script>

<style></style>
