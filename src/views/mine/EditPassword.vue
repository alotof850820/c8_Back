<template>
  <div class="p-8 bg-white flex flex-col justify-center items-center">
    <BasicForm @register="register" />
    <div class="flex justify-center">
      <a-button @click="resetFields"> 重置 </a-button>
      <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { editPassword } from '@/api/sys/user';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'ChangePassword' });

  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'password',
        label: '新密码',
        component: 'InputPassword',
        required: true,
        componentProps: {
          maxlength: 16,
        },
        rules: [
          {
            required: true,
            validator: (_, value) => {
              if (value.length < 6 || value.length > 16) {
                return Promise.reject('密码长度应为6-16位');
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
      },
      {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'InputPassword',

        dynamicRules: ({ values }) => {
          return [
            {
              required: true,
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject('密码不能为空');
                }
                if (value !== values.password) {
                  return Promise.reject('两次输入的密码不一致!');
                }
                return Promise.resolve();
              },
            },
          ];
        },
      },
    ],
  });

  async function handleSubmit() {
    const { createMessage } = useMessage();
    try {
      const values = await validate();
      await editPassword({ password: values.password, confirmPassword: values.confirmPassword });
      resetFields();
      createMessage.success(`修改成功`);
    } catch (error) {
      if (error.response.data.message) {
        createMessage.error(error.response.data.message);
      }
    }
  }
</script>
