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
  import { videoDetailFormSchema } from './video.data';
  import { editVideoDetail, getVideoDetail } from '@/api/video';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const videoId = ref(0);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: videoDetailFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    videoId.value = data.id;
    const res = await getVideoDetail(videoId.value);
    setFieldsValue({
      ...res,
      status: data.status,
    });
  });
  async function handleSubmit() {
    try {
      const values = await validate();

      console.log(values);

      await editVideoDetail(videoId.value, values);
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
