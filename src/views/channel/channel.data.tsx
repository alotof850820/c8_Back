import {
  patchChannelsDividendPercent,
  patchChannelsDomain,
  patchChannelsKey,
  patchChannelsType,
} from '@/api/channel';
import { useMessage } from '@/hooks/web/useMessage';
import { h } from 'vue';
import { Input, Select } from 'ant-design-vue';

export const columns = [
  {
    title: '渠道ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '渠道NID',
    helpMessage: '推广用的NID',
    dataIndex: 'nid',
    customRender: ({ record }) => {
      return h(Input, {
        value: record.nid,
        onClick: (e) => {
          e.stopPropagation();
        },
        onBlur: (value) => {
          if (record.nid === value) return;
          const target = value.target as HTMLInputElement;
          if (record.nid === target.value) return;
          if (target) {
            const { createMessage } = useMessage();
            patchChannelsKey(record.id, { nid: target.value })
              .then(() => {
                record.age = +target.value;
                createMessage.success('修改关键字成功');
              })
              .catch(() => {
                createMessage.error('修改关键字失败');
              });
          }
        },
        type: 'text',
      });
    },
  },
  {
    title: '渠道域名',
    dataIndex: 'domain',
    customRender: ({ record }) => {
      return h(Input, {
        value: record.domain,
        onClick: (e) => {
          e.stopPropagation();
        },
        onBlur: (value) => {
          if (record.domain === value) return;
          const target = value.target as HTMLInputElement;
          if (record.domain === target.value) return;
          if (target) {
            const { createMessage } = useMessage();
            patchChannelsDomain(record.id, { domain: target.value })
              .then(() => {
                record.age = +target.value;
                createMessage.success('修改关键字成功');
              })
              .catch(() => {
                createMessage.error('修改关键字失败');
              });
          }
        },
        type: 'text',
      });
    },
  },
  {
    title: '渠道类型',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return h(Select, {
        value: record.type,
        onClick: (e) => {
          e.stopPropagation();
        },
        onChange: (value) => {
          const { createMessage } = useMessage();
          patchChannelsType(record.id, { type: +value! })
            .then(() => {
              record.type = value;
              createMessage.success('修改类型成功');
            })
            .catch(() => {
              createMessage.error('修改类型失败');
            });
        },
        options: [
          { label: '提成渠道', value: 0 },
          { label: '推广渠道', value: 1 },
          { label: '其他渠道', value: 2 },
        ],
      });
    },
  },
  {
    title: '信箱',
    dataIndex: 'email',
  },
  {
    title: '分红比例',
    dataIndex: 'dividendPercent',
    customRender: ({ record }) => {
      const handleBlur = async (e: any) => {
        const target = e.target as HTMLInputElement;
        if (record.dividendPercent === +target.value) return;
        if (+target.value > 100) {
          target.value = '100';
        } else if (+target.value < 0) {
          target.value = '0';
        }
        if (target) {
          const { createMessage } = useMessage();
          patchChannelsDividendPercent(record.id, { dividendPercent: +target.value })
            .then(() => {
              record.dividendPercent = +target.value;
              createMessage.success('修改分红比例成功');
            })
            .catch(() => {
              createMessage.error('修改分红比例失败');
            });
        }
      };
      const handleClick = (e: any) => {
        e.stopPropagation();
      };
      return (
        <div style="display: flex; align-items: center; gap: 4px">
          <Input
            value={record.dividendPercent}
            onBlur={handleBlur}
            onClick={handleClick}
            type="number"
            min={0}
            max={100}
          />
          <div style="white-space: nowrap">%</div>
        </div>
      );
    },
  },
];
