<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="创建渠道" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useMessage } from '@/hooks/web/useMessage';
  import { postChannels } from '@/api/channel';
  import { computed, ref } from 'vue';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const isPromotion = ref(false);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: computed(() => [
      {
        field: 'nid',
        label: '渠道NID',
        component: 'Input',
        required: isPromotion.value,
        defaultValue: '',
        componentProps: {
          maxlength: 50,
        },
      },
      {
        field: 'domain',
        label: '渠道网域',
        component: 'Input',
        defaultValue: '',
        componentProps: {
          maxlength: 200,
        },
      },
      {
        field: 'type',
        label: '渠道类型',
        component: 'Select',
        defaultValue: 0,
        colProps: {
          span: 12,
        },
        required: true,
        componentProps: {
          options: [
            { label: '提成渠道', value: 0 },
            { label: '推广渠道', value: 1 },
            { label: '其他渠道', value: 2 },
          ],
          onChange: (value) => {
            isPromotion.value = value === 1;
          },
        },
      },
      {
        field: 'dividendPercent',
        label: '分红比例(%)',
        component: 'InputNumber',
        required: true,
        defaultValue: 0,
        componentProps: {
          min: 0,
          max: 100,
          onChange: (value) => {
            const val = value === '' ? 0 : +value;
            if (val > 100) {
              value = '100';
            } else if (val <= 0) {
              value = '0';
            }
          },
        },
      },
    ]),
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner();
  async function handleSubmit() {
    try {
      const values = await validate();
      await postChannels(values);
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
