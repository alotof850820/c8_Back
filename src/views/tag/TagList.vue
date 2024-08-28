<template>
  <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { h } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { editTagEnable, getTags } from '@/api/tag';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload, getForm }] = useTable({
    title: '预约列表',
    maxHeight: 600,
    api: getTags,
    beforeFetch: (params) => {
      params = {
        enable: params.enable || null,
        pageIndex: params.page,
        pageSize: 10,
      };
      return params;
    },
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
      },
      {
        title: '名稱',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '是否啟用',
        dataIndex: 'enable',
        width: 120,
        customRender: ({ record }) => {
          return h(Switch, {
            checked: record.enable,
            onChange: () => {
              editTagEnable(record.id, { enable: !record.enable });
              const { createMessage } = useMessage();
              createMessage.success(`${record.enable ? '禁用' : '启用'}成功`);
              record.enable = !record.enable;
            },
            checkedChildren: '启用',
            unCheckedChildren: '禁用',
          });
        },
      },
    ],
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    formConfig: {
      labelWidth: 100,
      schemas: [
        {
          field: 'enable',
          component: 'Switch',
          label: '状态',
          colProps: {
            span: 8,
          },
          componentProps: {
            checkedValue: true,
            unCheckedValue: false,
            checkedChildren: '启用',
            unCheckedChildren: '禁用',
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
  });
</script>

<style></style>
