<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="女优详情" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { editCouponDetailFormSchema, isChange } from './coupon.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { editCoupons, getCouponsDetail } from '@/api/coupon';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const couponId = ref(0);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: editCouponDetailFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    resetFields();
    couponId.value = data.id;
    const res = await getCouponsDetail(data.id);
    res.state = data.state;
    res.sendType === 0 ? (isChange.value = false) : (isChange.value = true);

    setFieldsValue({
      ...res,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();

      await editCoupons(couponId.value, values);
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
