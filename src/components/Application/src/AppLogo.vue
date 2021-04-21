<template>
  <div class="vben-app-logo antion" :class="[prefixCls, theme]" @click="handleGoHome">
    <img src="../../../assets/images/logo.png" alt="" />
    <div
      class="ml-2 truncate md:opacity-100"
      :class="[
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !alwaysShowTitle,
        },
      ]"
      v-show="showTitle"
    >
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useGlobSetting } from '/@/hooks/setting'
  import { useGo } from '/@/hooks/web/useGo'
  import { PageEnum } from '/@/enums/pageEnums'
  export default defineComponent({
    name: 'AppLogo',
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
      showTitle: propTypes.bool.def(true),
      alwaysShowTitle: propTypes.bool.def(false),
    },
    setup() {
      const { prefixCls } = useDesign('app-logo')
      const { title } = useGlobSetting()

      const go = useGo()
      function handleGoHome() {
        go(PageEnum.BASE_HOME)
      }
      return {
        prefixCls,
        title,
        handleGoHome,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';
  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
    }
  }
</style>
