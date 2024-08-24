<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="文章详情" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <Tinymce
      :value="content"
      :toolbar="[]"
      @change="handleChange"
      @get-raw-file="handleGetRawFile"
    />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { editArticleDetailFormSchema } from './account.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { getHomesArticlesDetail, putHomesArticlesDetail } from '@/api/home';
  import { Tinymce } from '@/components/Tinymce';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const articleId = ref(0);
  const content = ref('');
  const dataContent = ref('');
  const imgList = ref<string[]>([]);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: editArticleDetailFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    resetFields();
    articleId.value = data.id;
    const res = await getHomesArticlesDetail(data.id);
    setFieldsValue({
      ...res.data,
      cover: res.data.coverUrl === '' ? null : [res.data.coverUrl],
    });
    content.value = res.data.content.replace(/<\/?p>/g, '');
  });

  function handleChange(value: string) {
    dataContent.value = value;
  }

  function handleGetRawFile(file: string) {
    imgList.value.push(file);
  }

  async function handleSubmit() {
    try {
      const values: {
        title: string;
        cover: string | File;
        sourceType: number;
        linkUrl: string;
        linkType: number;
      } = await validate();

      let coverIsRequired =
        values.cover[0] === '' ? true : typeof values.cover[0] !== 'string' ? true : false;

      const data = {
        title: values.title,
        coverUrl: coverIsRequired ? null : values.cover[0], // 没有修改图片直接把网址传回来)
        cover: coverIsRequired ? values.cover[0].originFileObj : null, // CoverUrl为空则此栏位必填 File档
        content: `<html><head>${dataContent.value.replace(/<img([^>]*?)data-key="([^"]*?)"/g, '<img$1key="$2"')}</head></html>`,
        sourceType: values.sourceType,
        linkUrl: values.linkUrl, // 首页文章跳转类型有值必填
        linkType: values.linkType,
        images: imgList.value.length > 0 ? imgList.value : null,
      };

      const formData = new FormData();
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
          data[key].forEach((item: string, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      await putHomesArticlesDetail(articleId.value, formData);
      createMessage.success(`修改成功`);
      emit('success');
    } catch (error) {
      if (error.response.data.message) {
        createMessage.error(error.response.data.message);
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
