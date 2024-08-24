import { BasicColumn, FormSchema } from '@/components/Table';
import { computed, h, ref } from 'vue';
import { Avatar, Input, Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { editGirlAge, editGirlHot, editGirlStatus } from '@/api/girls';
import { getCurrencyDropdowns } from '@/api/currency';

export const columns: BasicColumn[] = [
  {
    title: '女优ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 60,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 60,
    customRender: ({ record }) => {
      return h(Avatar, {
        src: record.avatar,
        icon: 'user',
      });
    },
  },
  // {
  //   title: '生日',
  //   dataIndex: 'birthday',
  //   width: 150,
  //   customRender: ({ record }) => {
  //     return h(DatePicker, {
  //       value: record.birthday,
  //       valueFormat: 'YYYY-MM-DD',
  //       placeholder: 'Select date',
  //       onChange: (date, dateString) => {
  //         editGirlBirthday(record.id, { birthday: dateString }).then(() => {
  //           record.birthday = dateString;
  //         });
  //       },
  //       onClick: (e) => {
  //         e.stopPropagation();
  //       },
  //     });
  //   },
  // },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    customRender: ({ record }) => {
      return h(Input, {
        value: record.age,
        onClick: (e) => {
          e.stopPropagation();
        },
        onBlur: (value) => {
          const target = value.target as HTMLInputElement;
          if (+target.value === record.age) return;
          if (target) {
            const { createMessage } = useMessage();
            editGirlAge(record.id, { age: +target.value })
              .then(() => {
                record.age = +target.value;
                createMessage.success('修改年龄成功');
              })
              .catch(() => {
                createMessage.error('修改年龄失败');
              });
          }
        },
        onChange: (value) => {
          if (+value.target.value! < 0) {
            value.target.value = '0';
          }
        },
        type: 'number',
      });
    },
  },
  {
    title: '是否为热门',
    dataIndex: 'isHot',
    width: 80,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.isHot,
        checkedChildren: '是',
        unCheckedChildren: '否',
        onClick: (_, e) => {
          e.stopPropagation();
          console.log(record.isHot);

          editGirlHot(record.id, { isHot: !record.isHot }).then(() => {
            record.isHot = !record.isHot;
          });
        },
      });
    },
  },
  {
    title: '女优类型',
    dataIndex: 'type',
    width: 120,
    customRender: ({ record }) => {
      return h(
        'div',
        {
          style: {
            color: record.type === 0 ? 'rgb(190, 24, 93)' : 'rgb(202, 138, 4)',
            backgroundColor: record.type === 0 ? 'pink' : 'rgb(253, 224, 71)',
            borderRadius: '4px',
            padding: '2px 4px',
          },
        },
        record.type === 0 ? '女优' : '素人',
      );
    },
    // customRender: ({ record }) => {
    //   return h(Switch, {
    //     checked: record.type === 0,
    //     checkedChildren: h('span', { style: { color: 'rgb(190 24 93)' } }, '女优'),
    //     unCheckedChildren: h('span', { style: { color: 'rgb(202 138 4)' } }, '素人'),
    //     style: {
    //       backgroundColor: record.type === 0 ? 'pink' : 'rgb(253 224 71)',
    //     },
    //     loading: record.pendingStatus,
    //     onClick: (_, e) => {
    //       e.stopPropagation();
    //       const { createMessage } = useMessage();
    //       editGirlType(record.id, { type: record.type === 0 ? 1 : 0 })
    //         .then(() => {
    //           record.type = record.type === 0 ? 1 : 0;
    //           createMessage.success(`已成功修改女优状态`);
    //         })
    //         .catch(() => {
    //           createMessage.error('修改女优状态失败');
    //         })
    //         .finally(() => {
    //           record.pendingStatus = false;
    //         });
    //     },
    //   });
    // },
  },
  {
    title: '女优状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onClick: (_, e) => {
          e.stopPropagation();
          const { createMessage } = useMessage();
          editGirlStatus(record.id, { status: record.status === 0 ? 1 : 0 })
            .then(() => {
              record.status = record.status === 0 ? 1 : 0;
              createMessage.success(`已成功修改女优状态`);
            })
            .catch(() => {
              createMessage.error('修改女优状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '女优名称',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'type',
    label: '女优类型',
    component: 'RadioButtonGroup',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        { label: '女优', value: 0 },
        { label: '素人', value: 1 },
      ],
    },
  },
  {
    field: 'status',
    label: '女优状态',
    component: 'RadioButtonGroup',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
  {
    field: 'isHot',
    label: '是否为热门',
    component: 'RadioButtonGroup',
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        { label: '否', value: false },
        { label: '是', value: true },
      ],
    },
  },
];

export const isAmateurs = ref<boolean>(false);

export const accountFormSchema = computed<FormSchema[]>(() => [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    defaultValue: '',
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
    },
  },
  {
    field: 'age',
    label: '年龄',
    component: 'InputNumber',
    required: true,
    defaultValue: '',
    componentProps: {
      min: 0,
      max: 255,
    },
    colProps: {
      span: 20,
    },
  },
  {
    field: 'height',
    label: '身高',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value < 255) {
              resolve();
            } else {
              reject('请输入0~255之间的数字');
            }
          });
        },
      },
    ],
  },
  {
    field: 'weight',
    label: '体重',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value < 255) {
              resolve();
            } else {
              reject('请输入0~255之间的数字');
            }
          });
        },
      },
    ],
  },
  {
    field: 'cupSize',
    label: '罩杯',
    component: 'Input',
    defaultValue: '',
    required: true,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (/^[A-Za-z]$/.test(value)) {
              resolve();
            } else {
              reject('请输入A ~ Z (一个字)');
            }
          });
        },
      },
    ],
  },
  {
    field: 'introduce',
    label: '介绍',
    component: 'InputTextArea',
    defaultValue: '',
    componentProps: {
      maxlength: 200,
    },
  },
  {
    field: 'isHot',
    label: '是否热门',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'type',
    label: '女优类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '女优', value: 0 },
        { label: '素人', value: 1 },
      ],
      onChange: (val) => {
        if (val.target?.value === 0) {
          isAmateurs.value = false;
        } else if (val.target?.value === 1) {
          isAmateurs.value = true;
        }
      },
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    defaultValue: '',
    componentProps: {
      maxlength: 200,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'pinYin',
    label: '拼音',
    component: 'Input',
    defaultValue: '',
    componentProps: {
      maxlength: 1,
    },
  },
  {
    field: 'video',
    label: '女优影片',
    component: 'ImageUpload',
    defaultValue: [],
    required: !isAmateurs.value,
    colProps: {
      span: 24,
    },
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      multiple: false,
      maxNumber: 1,
      accept: ['mp4'],
      maxSize: 1024,
    },
  },
  {
    field: 'images',
    label: '女优图片',
    component: 'ImageUpload',
    defaultValue: [],
    colProps: {
      span: 24,
    },
    required: isAmateurs.value,
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      multiple: true,
      maxNumber: 5,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
    },
  },
  {
    field: 'cover',
    label: '女优影片预览图',
    helpMessage: '如没上传预览图，则使用影片第十帧作为预览图',
    component: 'ImageUpload',
    colProps: {
      span: 24,
    },
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      accept: ['png', 'jpeg', 'jpg'],
    },
    // rules: [
    //   {
    //     validator(e, value) {
    //       return new Promise((resolve) => {
    //         if (value[0]?.originFileObj instanceof File) {
    //           resolve();
    //         } else {
    //           value = null;
    //           resolve();
    //         }
    //       });
    //     },
    //   },
    // ],
  },
  {
    field: 'depositCurrencyId',
    label: '订金币别',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getCurrencyDropdowns,
      labelField: 'name',
      valueField: 'id',
      placeholder: '请选择',
    },
  },
  {
    field: 'deposit',
    label: '订金',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value >= 0) {
              resolve();
            } else {
              reject('请输入正数');
            }
          });
        },
      },
    ],
  },
  {
    field: 'dateExpensesCurrencyId',
    label: '约会费用币别',
    component: 'ApiSelect',
    componentProps: {
      api: getCurrencyDropdowns,
      labelField: 'name',
      valueField: 'id',
      placeholder: '请选择',
    },
    required: true,
    labelWidth: 120,
  },
  {
    field: 'dateExpenses',
    label: '约会费用',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value >= 0) {
              resolve();
            } else {
              reject('请输入正数');
            }
          });
        },
      },
    ],
  },
]);

export const editGirlDetailFormSchema = computed<FormSchema[]>(() => [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    defaultValue: '',
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'ImageUpload',
    required: true,
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
    },
  },
  {
    field: 'age',
    label: '年龄',
    component: 'InputNumber',
    required: true,
    defaultValue: '',
    componentProps: {
      min: 0,
      max: 255,
    },
    colProps: {
      span: 20,
    },
  },
  {
    field: 'height',
    label: '身高',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value < 255) {
              resolve();
            } else {
              reject('请输入0~255之间的数字');
            }
          });
        },
      },
    ],
  },
  {
    field: 'weight',
    label: '体重',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value < 255) {
              resolve();
            } else {
              reject('请输入0~255之间的数字');
            }
          });
        },
      },
    ],
  },
  {
    field: 'cupSize',
    label: '罩杯',
    component: 'Input',
    defaultValue: '',
    required: true,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (/^[A-Za-z]$/.test(value)) {
              resolve();
            } else {
              reject('请输入A ~ Z (一个字)');
            }
          });
        },
      },
    ],
  },
  {
    field: 'introduce',
    label: '介绍',
    component: 'InputTextArea',
    defaultValue: '',
    componentProps: {
      maxlength: 200,
    },
  },
  {
    field: 'isHot',
    label: '是否热门',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'type',
    label: '女优类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '女优', value: 0 },
        { label: '素人', value: 1 },
      ],
      onChange: (val) => {
        if (val.target?.value === 0) {
          isAmateurs.value = false;
        } else if (val.target?.value === 1) {
          isAmateurs.value = true;
        }
      },
    },
  },
  {
    field: 'status',
    label: '女优状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    required: true,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    defaultValue: '',
    componentProps: {
      maxlength: 200,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'pinYin',
    label: '拼音',
    component: 'Input',
    defaultValue: '',
    componentProps: {
      maxlength: 1,
    },
  },
  {
    field: 'video',
    label: '女优影片',
    component: 'ImageUpload',
    defaultValue: [],
    required: !isAmateurs.value,
    colProps: {
      span: 24,
    },
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      multiple: false,
      maxNumber: 1,
      accept: ['mp4'],
      maxSize: 1024,
    },
  },
  {
    field: 'images',
    label: '女优图片',
    component: 'ImageUpload',
    defaultValue: [],
    colProps: {
      span: 24,
    },
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      multiple: true,
      maxNumber: 5,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 20,
    },
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (isAmateurs.value) {
              if (value.length > 0) {
                resolve();
              } else {
                reject('请上传女优图片');
              }
            } else {
              resolve();
            }
          });
        },
      },
    ],
  },
  {
    field: 'cover',
    label: '女优影片预览图',
    helpMessage: '如没上传预览图，则使用影片第十帧作为预览图',
    component: 'ImageUpload',
    colProps: {
      span: 24,
    },
    defaultValue: [],
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      accept: ['png', 'jpeg', 'jpg'],
    },
    // rules: [
    //   {
    //     validator(e, value) {
    //       return new Promise((resolve) => {
    //         if (value[0]?.originFileObj instanceof File) {
    //           resolve();
    //         } else {
    //           value = null;
    //           resolve();
    //         }
    //       });
    //     },
    //   },
    // ],
  },
  {
    field: 'depositCurrencyId',
    label: '订金币别',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getCurrencyDropdowns,
      labelField: 'name',
      valueField: 'id',
      placeholder: '请选择',
    },
  },
  {
    field: 'deposit',
    label: '订金',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value >= 0) {
              resolve();
            } else {
              reject('请输入正数');
            }
          });
        },
      },
    ],
  },
  {
    field: 'dateExpensesCurrencyId',
    label: '约会费用币别',
    component: 'ApiSelect',
    componentProps: {
      api: getCurrencyDropdowns,
      labelField: 'name',
      valueField: 'id',
      placeholder: '请选择',
    },
    required: true,
    labelWidth: 120,
  },
  {
    field: 'dateExpenses',
    label: '约会费用',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    rules: [
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (value >= 0) {
              resolve();
            } else {
              reject('请输入正数');
            }
          });
        },
      },
    ],
  },
]);
