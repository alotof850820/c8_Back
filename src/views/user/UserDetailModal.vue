<template>
  <div>
    <BasicModal v-bind="$attrs" @register="registerModal" title="用戶详情" @ok="handleSubmit">
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { editUserDetail, getUserDetail } from '@/api/users';
  import { userDetailFormSchema } from './user.data';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const userId = ref(0);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: userDetailFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    userId.value = data.id;
    const res = await getUserDetail(userId.value);
    setFieldsValue({
      ...res,
    });
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      const data = {
        email: values.email,
        userName: values.userName,
        introduction: values.introduction,
        sexType: values.sexType,
        type: values.type,
        status: values.status,
      };

      await editUserDetail(userId.value, data);
      resetFields();
      createMessage.success(`修改成功`);
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
