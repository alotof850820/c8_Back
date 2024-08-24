<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建商品" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { productFormSchema } from './product.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { createProducts } from '@/api/product';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: productFormSchema,
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

      const data = {
        name: values.name,
        introduce: values.introduce,
        amount: values.amount,
        point: values.point,
        type: values.type,
        status: values.status,
        productBooking: {
          bookingTime: values.bookingTime,
          type: values.bookingType,
        },
        productPoint: null,
        // productBooking:
        //   values.bookingType && values.bookingTime
        //     ? {
        //         bookingTime: values.bookingTime,
        //         type: values.bookingType,
        //       }
        //     : null,
        // productPoint: values.productPoint
        //   ? {
        //       point: values.productPoint,
        //     }
        //   : null,
      };

      await createProducts(data);
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
