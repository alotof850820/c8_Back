<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">创建用戶</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <BasicButton type="primary" @click="handleClick(record, $event)"> 查看 </BasicButton>
        </template>
      </template>
    </BasicTable>
    <UserDetailModal @register="registerDetailModal" @success="reload()" />
    <AddUserModal @register="registerModal" @success="reload()" />
    <MoneyHistoryModalModal @register="registerMoneyHistoryModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './user.data';
  import { getUsers } from '@/api/users';
  import { useModal } from '@/components/Modal';
  import UserDetailModal from './UserDetailModal.vue';
  import BasicButton from '@/components/Button/src/BasicButton.vue';
  import AddUserModal from './AddUserModal.vue';
  import MoneyHistoryModalModal from './MoneyHistoryModal.vue';

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerMoneyHistoryModal, { openModal: openMoneyHistoryModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: getUsers,
    maxHeight: 600,
    beforeFetch: (params) => {
      params = {
        pageIndex: params.page,
      };
      return params;
    },
    columns: columns,
    // formConfig: {
    //   labelWidth: 100,
    //   schemas: searchFormSchema,
    //   autoSubmitOnEnter: true,
    //   submitFunc: async () => {
    //     const searchInput = getForm().getFieldsValue();
    //     reload({
    //       searchInfo: searchInput,
    //       page: 1,
    //     });
    //   },
    // },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    actionColumn: {
      width: 160,
      title: '查看金幣歷史紀錄',
      dataIndex: 'action',
      fixed: false,
    },
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

  const handleClick = (record, e) => {
    e.stopPropagation();
    openMoneyHistoryModal(true, record);
  };
</script>

<style></style>
