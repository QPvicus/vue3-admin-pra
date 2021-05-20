<template>
  <Dropdown
    placement="bottomCenter"
    :trigger="['click']"
    overlayClassName="app-locale-picker-overlay"
    :selectedKeys="selectKeys"
    @menuEvent="handleMenuEvent"
    :dropMenulist="localeList"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLangText }}</span>
    </span>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watchEffect, unref } from 'vue'
  import { Dropdown, DropMenu } from '/@/components/Dropdown'
  import { useLocale } from '/@/locales/useLocale'
  import { propTypes } from '/@/utils/propTypes'
  import { localeList } from '/@/settings/localeSetting'
  import { LocaleType } from '/#/config'
  import Icon from '/@/components/Icon'
  export default defineComponent({
    name: 'AppLocalePicker',
    components: {
      Dropdown,
      Icon,
    },
    props: {
      showText: propTypes.bool.def(true),
      reload: propTypes.bool,
    },
    setup(props) {
      const selectKeys = ref<string[]>([])
      const { getLocale, changeLocale } = useLocale()
      const getLangText = computed(() => {
        const key = selectKeys.value[0]
        if (!key) return ''
        return localeList.find((item) => item.event === key)?.text
      })
      watchEffect(() => {
        selectKeys.value = [unref(getLocale)]
      })

      async function toggleLocale(lang: LocaleType | string) {
        await changeLocale(lang as LocaleType)
        selectKeys.value = [lang as string]
        props.reload && location.reload()
      }

      function handleMenuEvent(menu: DropMenu) {
        if (unref(getLocale) === menu.event) return
        toggleLocale(menu.event as string)
      }
      return {
        selectKeys,
        handleMenuEvent,
        getLangText,
        localeList,
      }
    },
  })
</script>

<style lang="less">
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
</style>
