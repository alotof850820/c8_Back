<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建女优" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { addCouponFormSchema } from './coupon.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { postCoupon } from '@/api/coupon';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: addCouponFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner();
  async function handleSubmit() {
    try {
      const values = await validate();

      await postCoupon(values);
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
