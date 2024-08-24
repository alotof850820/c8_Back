<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="商品详情" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { editProductDetailFormSchema, productType } from './product.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { getProductDetail, editProduct } from '@/api/product';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const productId = ref(0);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    schemas: editProductDetailFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    productId.value = data.id;
    const res = await getProductDetail(data.id);
    productType.value = res.type;
    setFieldsValue({
      name: res.name,
      introduce: res.introduce,
      amount: res.amount,
      point: res.point,
      type: res.type,
      status: res.status,
      bookingTime: res.productBooking?.bookingTime,
      bookingType: res.productBooking?.type,
      productPoint: null,
      // bookingTime: res.type === 1 ? res.productBooking?.bookingTime : null,
      // bookingType: res.type === 1 ? res.productBooking?.type : null,
      // productPoint: res.type === 0 ? res.productPoint?.point : null,
    });
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

      await editProduct(productId.value, data);
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
