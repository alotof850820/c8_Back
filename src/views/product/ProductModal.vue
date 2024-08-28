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
      const value = await validate();

      const formData = new FormData();
      const data = {
        ...value,
        image: value.image[0].originFileObj,
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

      await createProducts(formData);
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
