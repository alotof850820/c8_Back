<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="女优详情" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { editGirlDetailFormSchema, isAmateurs } from './account.data';
  import { editGirlDetail, getGirlDetail, girlDetailApiRequest } from '@/api/girls';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  const girlId = ref(0);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: editGirlDetailFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    resetFields();
    girlId.value = data.id;
    const res = await getGirlDetail(data.id);

    res.type === 0 ? (isAmateurs.value = false) : (isAmateurs.value = true);

    setFieldsValue({
      ...res,
      cover: res.coverUrl ? [res.coverUrl] : [],
      avatar: res.avatarUrl ? [res.avatarUrl] : [],
      video: res.videoUrl ? [res.videoUrl] : [],
      dateExpenses: res.charge.dateExpenses,
      dateExpensesCurrencyId: res.charge.dateExpensesCurrencyId,
      deposit: res.charge.deposit,
      depositCurrencyId: res.charge.depositCurrencyId,
      remark: res.remark || '',
      images: res.actressImages.map((item) => `${item.imageUrl}#${item.id}`),
    });
  });

  async function handleSubmit() {
    try {
      const values: girlDetailApiRequest = await validate();
      console.log(values);

      let { avatar, cover, video } = values;

      const data = {
        ...values,
        avatar:
          Array.isArray(avatar) && avatar[0]?.originFileObj instanceof File
            ? avatar[0]?.originFileObj
            : '',
        cover:
          Array.isArray(cover) && cover[0]?.originFileObj instanceof File
            ? cover[0]?.originFileObj
            : '',
        video:
          Array.isArray(video) && video[0]?.originFileObj instanceof File
            ? video[0]?.originFileObj
            : '',
        images: values.images
          ? values.images
              ?.map((item) => {
                if (item.originFileObj) {
                  return item.originFileObj;
                }
              })
              .filter((item) => item !== undefined)
          : null,
        imageIds: values.images
          ? values.images
              ?.map((item) => {
                if (typeof item === 'string') {
                  return +new URL(item).hash.substring(1);
                }
              })
              .filter((id) => id !== undefined)
          : null,
      };

      const formData = new FormData();
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
          data[key].forEach((item: string, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      await editGirlDetail(girlId.value, formData);
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
