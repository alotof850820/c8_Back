<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">创建渠道</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'email'">
          <div v-if="!record.email" class="flex flex-col gap-1">
            <a-button class="mx-auto" type="primary" @click="openAddEmail(true, record.id)">
              新增信箱</a-button
            >
          </div>
        </template>
      </template>
    </BasicTable>
    <ChannelModal @register="registerModal" @success="reload()" />
    <AddEmailModal @register="registerAddEmail" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getChannels } from '@/api/channel';
  import ChannelModal from './ChannelModal.vue';
  import { useModal } from '@/components/Modal';
  import AddEmailModal from './AddEmailModal.vue';
  import { columns } from './channel.data';

  const [registerModal, { openModal }] = useModal();
  const [registerAddEmail, { openModal: openAddEmail }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    title: '渠道列表',
    maxHeight: 600,
    api: getChannels,
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
      schemas: [
        {
          field: 'nid',
          label: '渠道NID',
          component: 'Input',
          colProps: {
            span: 9,
          },
        },
        {
          field: 'type',
          label: '渠道类型',
          component: 'Select',
          colProps: {
            span: 9,
          },
          componentProps: {
            options: [
              { label: '提成渠道', value: 0 },
              { label: '推广渠道', value: 1 },
              { label: '其他渠道', value: 2 },
            ],
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
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
  });
</script>

<style></style>
