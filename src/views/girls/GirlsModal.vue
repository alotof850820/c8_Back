<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建女优" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { createGirl, girlDetailApiRequest } from '@/api/girls';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner();
  async function handleSubmit() {
    try {
      const values: girlDetailApiRequest = await validate();
      let { avatar, cover, video } = values;

      const data = {
        ...values,
        avatar:
          Array.isArray(avatar) && avatar[0]?.originFileObj instanceof File
            ? avatar[0]?.originFileObj
            : '',
        cover:
          Array.isArray(cover) && cover[0]?.originFileObj instanceof File
            ? cover[0]?.originFileObj
            : '',
        video:
          Array.isArray(video) && video[0]?.originFileObj instanceof File
            ? video[0]?.originFileObj
            : '',
        images: values.images
          ?.map((item) => {
            if (item.originFileObj) {
              return item.originFileObj;
            }
          })
          .filter((item) => item !== undefined),
        imageIds: values.images
          ?.map((item) => {
            if (typeof item === 'string') {
              return +new URL(item).hash.substring(1);
            }
          })
          .filter((id) => id !== undefined),
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
      await createGirl(formData);
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
