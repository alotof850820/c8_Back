<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">创建首页文章</a-button>
      </template>
    </BasicTable>
    <ArticleModal @register="registerModal" @success="reload()" />
    <ArticleDetailModal @register="registerDetailModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './account.data';
  import ArticleModal from './ArticleModal.vue';
  import ArticleDetailModal from './ArticleDetailModal.vue';
  import { useModal } from '@/components/Modal';
  import { getHomesArticles } from '@/api/home';

  const [registerModal, { openModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    title: '文章列表',
    api: getHomesArticles,
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
    useSearchForm: true,
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
