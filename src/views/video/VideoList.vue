<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5">
      <template #toolbar>
        <a-button type="primary" @click="openModal">建立影片</a-button>
      </template>
    </BasicTable>
    <AddVideoModal @register="registerModal" @success="reload()" />
    <VideoDetailModal @register="registerDetailModal" @success="reload()" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns } from './video.data';
  import { getVideo } from '@/api/video';
  import AddVideoModal from './AddVideoModal.vue';
  import VideoDetailModal from './VideoDetailModal.vue';

  const [registerModal, { openModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '影片列表',
    api: getVideo,
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
