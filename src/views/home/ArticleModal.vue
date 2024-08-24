<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建首页文章" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <Tinymce
      :value="content"
      :toolbar="[]"
      @get-raw-file="handleGetRawFile"
      @get-content="handleGetContent"
      @change="handleChange"
    />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { articleFormSchema } from './account.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Tinymce } from '@/components/Tinymce';
  import { ref } from 'vue';
  import { postHomesArticles } from '@/api/home';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const content = ref('');
  const dataContent = ref('');
  const imgList = ref<string[]>([]);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: articleFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner();

  function handleGetRawFile(file: string) {
    imgList.value.push(file);
  }

  function handleGetContent(value: string) {
    content.value = value;
  }

  function handleChange(value: string) {
    dataContent.value = value;
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
        content: `<html><head>${content.value.replace(/<img([^>]*?)data-key="([^"]*?)"/g, '<img$1key="$2"')}</head></html>`,
        sourceType: values.sourceType,
        linkUrl: values.linkUrl, // 首页文章跳转类型有值必填
        linkType: values.linkType ? values.linkType : null,
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

      await postHomesArticles(formData);
      resetFields();
      createMessage.success(`创建成功`);
      emit('success');
      closeModal();
    } catch (error) {
      if (error.response.data.message) {
        createMessage.error(error.response.data.message);
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
