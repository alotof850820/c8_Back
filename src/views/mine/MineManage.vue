<script lang="ts" setup>
  // import { useGlobSetting } from '@/hooks/setting';

  const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
  // const globSetting = useGlobSetting();
  const version = import.meta.env.VITE_VERSION;
</script>
<template>
  <div class="user_container">
    <div class="user_box flex flex-col gap-3">
      <div>用户资料</div>
      <div>用户：{{ userData.roles }}</div>
      <div>{{ userData.roles === 'Admin' ? '超级管理员' : '一般管理员' }}</div>
    </div>
    <div class="user_box flex flex-col gap-3">
      <div>版本号码 : {{ version }}</div>
      <!-- <div>{{ globSetting.apiUrl }}</div> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
  .user_container {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 6px;

    .user_box {
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 6px;
      background-color: #fff;
    }
  }
</style>
