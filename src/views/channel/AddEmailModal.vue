<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="新增信箱" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useMessage } from '@/hooks/web/useMessage';
  import { postChannelsAccount } from '@/api/channel';
  import { computed, ref } from 'vue';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const password = ref('');
  const channelId = ref(0);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: computed(() => [
      {
        field: 'email',
        label: '电子邮件',
        component: 'Input',
        required: true,
        defaultValue: '',
        componentProps: {
          maxlength: 50,
        },
      },
      {
        field: 'password',
        label: '密码',
        component: 'Input',
        required: true,
        defaultValue: '',
        componentProps: {
          maxlength: 16,
          onBlur: (value) => {
            const target = value.target as HTMLInputElement;
            password.value = target.value;
          },
        },
        rules: [
          {
            validator: (_, value) => {
              if (value.length < 6 || value.length > 16) {
                return Promise.reject('密码长度为6-16位');
              }
              return Promise.resolve();
            },
          },
        ],
      },
      {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'Input',
        required: true,
        defaultValue: '',
        componentProps: {
          maxlength: 16,
        },
        rules: [
          {
            validator: (_, value) => {
              if (value !== password.value) {
                return Promise.reject('密码不一致');
              }
              return Promise.resolve();
            },
          },
        ],
      },
    ]),
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (id) => {
    resetFields();
    channelId.value = id;
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      const data = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      await postChannelsAccount(channelId.value, data);
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
