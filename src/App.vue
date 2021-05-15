<template>
  <config-provider :locale="getAntdLocale">
    <app-provider>
      <router-view />
      <Icon icon="gg:loadbar-doc" />
    </app-provider>
  </config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import { AppProvider } from '/@/components/Application'
  import { useTitle } from '/@/hooks/web/useTitle'
  import { useLocale } from './locales/useLocale'
  import Icon from '/@/components/Icon'
  export default defineComponent({
    name: 'App',
    components: {
      ConfigProvider,
      AppProvider,
      Icon,
    },
    setup() {
      useTitle()
      //  support Multi-language
      const { getAntdLocale } = useLocale()
      return {
        getAntdLocale,
      }
    },
  })
</script>
