<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建用户" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addUserFormSchema } from './user.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { createUser, createUserBgImage, createUserImage } from '@/api/users';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: addUserFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    resetFields();
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      const formData = new FormData();
      const formData2 = new FormData();
      const data = {
        image: values.imagePath[0].originFileObj,
      };
      const data2 = {
        image: values.backGroundPath[0].originFileObj,
      };
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
          data[key].forEach((item: string, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
      for (const key of Object.keys(data2)) {
        if (Array.isArray(data2[key])) {
          data2[key].forEach((item: string, index) => {
            formData2.append(`${key}[${index}]`, item);
          });
        } else if (data2[key] !== null) {
          formData2.append(key, data2[key]);
        }
      }
      const res = await createUserImage(formData);
      const res2 = await createUserBgImage(formData2);
      values.imagePath = res.imagePath;
      values.backGroundPath = res2.backGroundPath;
      await createUser(values);
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
