<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">创建女优</a-button>
      </template>
    </BasicTable>
    <GirlsModal @register="registerModal" @success="reload()" />
    <GirlDetailModal @register="registerDetailModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './account.data';
  import GirlsModal from './GirlsModal.vue';
  import GirlDetailModal from './GirlDetailModal.vue';
  import { useModal } from '@/components/Modal';
  import { getGirls } from '@/api/girls';

  const [registerModal, { openModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    title: '女优列表',
    api: getGirls,
    maxHeight: 600,
    beforeFetch: (params) => {
      params = {
        ...params,
        pageIndex: params.page,
        pageSize: params.pageSize,
      };
      return params;
    },
    columns: columns,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      submitFunc: async () => {
        const searchInput = getForm().getFieldsValue();
        reload({
          searchInfo: searchInput,
          page: 1,
        });
      },
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
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
