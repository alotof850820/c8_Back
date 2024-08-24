<template>
  <div
    ref="pageRef"
    class="h-full max-h-[300px] border-[1px] border-solid border-[#f0f0f0] border-b-none rounded-2xl overflow-auto bg-blueGray-200"
  >
    <div v-if="lists.length > 0">
      <div v-for="(item, i) in lists" :key="i">
        <div
          class="flex items-center justify-between gap-10 border-b-[1px] border-b-solid border-b-[#f0f0f0] rounded-2xl rounded-b-none"
        >
          <div class="w-[15%] p-4 text-center">{{ i + 1 }}</div>
          <div class="w-full p-4 text-center border-r-[1px] border-r-solid border-r-[#f0f0f0]">
            日期: {{ item.date }}
          </div>
          <div class="w-full p-4 text-center"> 注册数: {{ item.registerCount }}</div>
        </div>
      </div>
    </div>
    <div class="w-full p-4 text-center" v-else>无数据</div>

    <div ref="candidateTitleRef"></div>
  </div>
</template>

<script lang="ts" setup>
  import { getChannelsDialyStats } from '@/api/channel';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { useNextPage } from './useNextPage';

  const props = withDefaults(
    defineProps<{
      id?: number | string;
    }>(),
    {
      id: 0,
    },
  );

  const { setObserver, stopObserving, pageIndex, candidateTitleRef, pageRef } = useNextPage();

  const lists = ref<{ date: string; registerCount: number }[]>([]);
  const nodata = ref(false);

  const getData = async () => {
    const res = await getChannelsDialyStats({
      channelId: props.id,
      pageIndex: pageIndex.value,
    });

    if (res.items.length === 0) {
      nodata.value = true;
    } else {
      lists.value = lists.value.concat(res.items);
      nodata.value = false;
      ++pageIndex.value;
    }
  };

  const init = async () => {
    await getData();
  };

  onMounted(async () => {
    await init();

    setObserver(() => {
      if (nodata.value) return;
      getData();
    });
  });

  onBeforeUnmount(() => {
    stopObserving();
  });
</script>

<style></style>
