import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Input, Switch, Textarea } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import {
  editProductCoin,
  editProductDescription,
  editProductDiscount,
  editProductImage,
  editProductName,
  editProductPrice,
  editProductStatus,
} from '@/api/product';
import { ImageUpload } from '@/components/Upload';

export const columns: BasicColumn[] = [
  {
    title: '商品ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '名称',
    dataIndex: 'name',
    minWidth: 150,
    customRender: ({ record }) => {
      return h(Input, {
        value: record.name,
        onBlur: (e: any) => {
          if (record.name === e.target.value) return;
          editProductName(record.id, { name: e.target?.value?.toString() || '' })
            .then(() => {
              record.name = e.target.value;
              const { createMessage } = useMessage();
              createMessage.success('编辑成功');
            })
            .then(() => {
              const { createMessage } = useMessage();
              createMessage.error('编辑失败');
            });
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    minWidth: 200,
    customRender: ({ record }) => {
      return h(Textarea, {
        value: record.description,
        onBlur: (e: any) => {
          if (record.description === e.target.value) return;
          editProductDescription(record.id, { description: e.target?.value?.toString() || '' })
            .then(() => {
              record.description = e.target.value;
              const { createMessage } = useMessage();
              createMessage.success('编辑成功');
            })
            .then(() => {
              const { createMessage } = useMessage();
              createMessage.error('编辑失败');
            });
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
  {
    title: '優惠價 (售價)',
    dataIndex: 'discountPrice',
    minWidth: 200,
    customRender: ({ record }) => {
      const handleBlur = async (e: any) => {
        const { createMessage } = useMessage();
        try {
          if (record.discountPrice === +e.target.value) return;
          await editProductDiscount(record.id, { discountPrice: +e.target?.value || 0 });
          record.discountPrice = e.target.value;
          createMessage.success('编辑成功');
        } catch (error) {
          createMessage.error('编辑失败');
        }
      };
      const handleClick = (e: any) => {
        e.stopPropagation();
      };
      return (
        <div style="display: flex; align-items: center; gap: 4px">
          <Input
            value={record.discountPrice}
            onBlur={handleBlur}
            onClick={handleClick}
            onInput={(e: any) => (record.discountPrice = e.target.value.replace(/[^\d]/g, ''))}
          />
          <div style="white-space: nowrap"> 優惠價</div>
        </div>
      );
    },
  },
  {
    title: '單價',
    dataIndex: 'price',
    minWidth: 200,
    customRender: ({ record }) => {
      const handleBlur = async (e: any) => {
        const { createMessage } = useMessage();
        try {
          if (record.price === +e.target.value) return;
          await editProductPrice(record.id, { price: +e.target?.value || 0 });
          record.price = +e.target.value;
          createMessage.success('编辑成功');
        } catch (error) {
          createMessage.error('编辑失败');
        }
      };
      const handleClick = (e: any) => {
        e.stopPropagation();
      };
      return (
        <div style="display: flex; align-items: center; gap: 4px">
          <Input
            value={record.price}
            onBlur={handleBlur}
            onClick={handleClick}
            onInput={(e: any) => (record.price = e.target.value.replace(/[^\d]/g, ''))}
          />
          <div style="white-space: nowrap"> 元</div>
        </div>
      );
    },
  },
  {
    title: '代幣',
    helpMessage: '儲值後會拿到的代幣',
    dataIndex: 'coin',
    minWidth: 200,
    customRender: ({ record }) => {
      const handleBlur = async (e: any) => {
        const { createMessage } = useMessage();
        try {
          if (record.coin === +e.target.value) return;
          await editProductCoin(record.id, { coin: +e.target?.value || 0 });
          record.coin = e.target.value;
          createMessage.success('编辑成功');
        } catch (error) {
          createMessage.error('编辑失败');
        }
      };
      const handleClick = (e: any) => {
        e.stopPropagation();
      };
      return (
        <div style="display: flex; align-items: center; gap: 4px">
          <Input
            value={record.coin}
            onBlur={handleBlur}
            onClick={handleClick}
            type="number"
            onInput={(e: any) => (record.coin = e.target.value.replace(/[^\d]/g, ''))}
          />
          <div style="white-space: nowrap"> 代幣</div>
        </div>
      );
    },
  },
  {
    title: '商品状态',
    dataIndex: 'state',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.state === 0,
        checkedChildren: '上架',
        unCheckedChildren: '下架',
        loading: record.pendingStatus,
        onClick: (_, e) => {
          e.stopPropagation();
          const { createMessage } = useMessage();
          editProductStatus(record.id, { state: record.state === 0 ? 1 : 0 })
            .then(() => {
              record.state = record.state === 0 ? 1 : 0;
              createMessage.success(`已成功修改商品状态`);
            })
            .catch(() => {
              createMessage.error('修改商品状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '商品圖片',
    dataIndex: 'imageUrl',
    customRender: ({ record }) => {
      return h(ImageUpload, {
        value: record.imageUrl ? [record.imageUrl] : [],
        api: () => {
          return Promise.resolve({
            url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
          });
        },
        onChange: (value) => {
          const formData = new FormData();
          const data = {
            image: value[0].originFileObj,
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
          editProductImage(record.id, formData);
        },
        onClick: (e) => {
          e.stopPropagation();
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'state',
    label: '商品状态',
    component: 'RadioButtonGroup',
    colProps: {
      span: 7,
    },
    componentProps: {
      options: [
        { label: '上架', value: 0 },
        { label: '下架', value: 1 },
      ],
    },
  },
];

export const productFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    defaultValue: '',
    componentProps: {
      placeholder: '请输入商品名称',
      maxlength: 50,
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    componentProps: {
      maxlength: 50,
    },
  },
  {
    field: 'price',
    label: '價格',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
    },
  },
  {
    field: 'discountedPrice',
    label: '優惠價',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
    },
  },
  {
    field: 'coin',
    label: '代幣',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
    componentProps: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
    },
  },
  {
    field: 'image',
    label: '商品圖片',
    component: 'ImageUpload',
    componentProps: {
      api: () => {
        return Promise.resolve({
          url: 'https://tdesign.gtimg.com/demo/demo-image.jpg',
        });
      },
      accept: ['png', 'jpeg', 'jpg', 'webp'],
      maxSize: 20,
      maxNumber: 1,
      multiple: false,
      onChange: (val) => {
        return val.originFileObj;
      },
    },
  },
];
