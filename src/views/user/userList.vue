<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'bookingId'">
          <BasicButton
            :disabled="!record.bookingId"
            type="primary"
            @click="openDetailModal(true, record)"
            >{{ record.bookingId ? '查看預約' : '尚未进行' }}</BasicButton
          >
        </template>
      </template>
    </BasicTable>
    <UserDetailModal @register="registerDetailModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './account.data';
  import { getUsers } from '@/api/users';
  import { useModal } from '@/components/Modal';
  import UserDetailModal from './UserDetailModal.vue';
  import BasicButton from '@/components/Button/src/BasicButton.vue';

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    title: '用户列表',
    api: getUsers,
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
