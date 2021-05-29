<template>
  <Layout :class="prefixCls">
    <!-- <LayoutFeatures /> -->
    <!-- <LayoutHeader fixed v-if="getShowFullHeaderRef" /> -->
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`">
        <!-- <LayoutMultipleHeader /> -->
        <!-- <LayoutContent /> -->
        <!-- <LayoutFooter /> -->
        <RouterView />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'
  import { Layout } from 'ant-design-vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import LayoutSideBar from './sider/index.vue'
  import { useAppInject } from '/@/hooks/web/useAppInject'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Layout,
      LayoutSideBar,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout')
      const { getIsMobile } = useAppInject()
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()

      const layoutClass = computed(() => {
        let cls: string[] = ['ant-layout']
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
          cls.push('ant-layout-has-sider')
        }
        return cls
      })
      return {
        prefixCls,
        getIsMobile,
        getShowSidebar,
        getIsMixSidebar,
        layoutClass,
      }
    },
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
