import { BasicColumn, FormSchema } from '@/components/Table';
import { computed, h, ref } from 'vue';
import { Input, Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import {
  patchHomesArticlesCover,
  patchHomesArticlesStatus,
  patchHomesArticlesTitle,
} from '@/api/home';
import { ImageUpload } from '@/components/Upload';

export const columns: BasicColumn[] = [
  {
    title: '文章ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
    customRender: ({ record }) => {
      return h(Input.TextArea, {
        value: record.title,
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          if (record.title === target.value) return;
          if (target) {
            const { createMessage } = useMessage();
            patchHomesArticlesTitle(record.id, { title: target.value })
              .then(() => {
                record.title = target.value;
                createMessage.success('修改标题成功');
              })
              .catch(() => {
                createMessage.error('修改标题失败');
              });
          }
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
  {
    title: '封面图',
    dataIndex: 'coverUrl',
    width: 150,
    customRender: ({ record }) => {
      return h(ImageUpload, {
        value: [record.coverUrl],
        api: () => {
          return Promise.resolve({
            url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
          });
        },
        onChange: (value) => {
          patchHomesArticlesCover(record.id, { cover: value[0].originFileObj });
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
  {
    title: '来源类型',
    dataIndex: 'sourceType',
    width: 100,
    customRender: ({ record }) => {
      return h('div', record.sourceType === 0 ? '官方网站' : '-');
    },
  },
  {
    title: '文章状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '上架',
        unCheckedChildren: '下架',
        loading: record.pendingStatus,
        onClick: (_, e) => {
          e.stopPropagation();
          const { createMessage } = useMessage();
          patchHomesArticlesStatus(record.id, { status: record.status === 0 ? 1 : 0 })
            .then(() => {
              record.status = record.status === 0 ? 1 : 0;
              createMessage.success(`已成功修改文章状态`);
            })
            .catch(() => {
              createMessage.error('修改文章状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '建立时间',
    dataIndex: 'createDateTime',
    width: 180,
    sorter: (a, b) => new Date(a.createDateTime).getTime() - new Date(b.createDateTime).getTime(),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: {
      xl: 12,
      xxl: 8,
    },
  },
  {
    field: 'status',
    label: '文章状态',
    component: 'RadioButtonGroup',
    colProps: {
      xl: 12,
      xxl: 8,
    },
    componentProps: {
      options: [
        { label: '上架', value: 0 },
        { label: '下架', value: 1 },
      ],
    },
  },
];

const linkUrlState = ref(false);

export const articleFormSchema = computed((): FormSchema[] => [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
    defaultValue: '',
  },
  {
    field: 'cover',
    label: '封面档案',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      onChange: (val) => {
        return val.originFileObj;
      },
    },
  },
  {
    field: 'sourceType',
    label: '来源类型',
    component: 'Select',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '官方网站', value: 0 },
        // { label: '自传', value: 1 },
      ],
    },
  },
  {
    field: 'linkUrl',
    label: '连结网址 ',
    component: 'Input',
    defaultValue: '',
    componentProps: {
      onChange: (val) => {
        if (val.target?.value) {
          linkUrlState.value = true;
        } else {
          linkUrlState.value = false;
        }
      },
    },
  },
  {
    field: 'linkType',
    label: '跳转类型',
    component: 'Select',
    defaultValue: null,
    required: linkUrlState.value,
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        { label: '不跳转', value: null },
        { label: 'App内部跳转', value: 0 },
        { label: '外部跳转', value: 1 },
      ],
    },
  },
]);

export const editArticleDetailFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
    defaultValue: '',
  },
  {
    field: 'cover',
    label: '封面档案',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      onChange: (val) => {
        return val.originFileObj;
      },
    },
  },
  {
    field: 'sourceType',
    label: '来源类型',
    component: 'Select',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '官方网站', value: 0 },
        // { label: '自传', value: 1 },
      ],
    },
  },
  {
    field: 'linkUrl',
    label: '连结网址 ',
    component: 'Input',
    defaultValue: '',
    componentProps: {
      onChange: (val) => {
        if (val.target?.value) {
          linkUrlState.value = true;
        } else {
          linkUrlState.value = false;
        }
      },
    },
  },
  {
    field: 'linkType',
    label: '跳转类型',
    component: 'Select',
    defaultValue: null,
    required: linkUrlState.value,
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        { label: '不跳转', value: null },
        { label: 'App内部跳转', value: 0 },
        { label: '外部跳转', value: 1 },
      ],
    },
  },
];
