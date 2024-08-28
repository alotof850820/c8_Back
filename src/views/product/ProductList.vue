<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">创建商品</a-button>
      </template>
    </BasicTable>
    <ProductModal @register="registerModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './product.data';
  import ProductModal from './ProductModal.vue';
  import { useModal } from '@/components/Modal';
  import { getProducts } from '@/api/product';

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    title: '商品列表',
    api: getProducts,
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
  });
</script>

<style></style>
