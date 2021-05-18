<template>
  <div
    v-if="getDarkModeToggle"
    :class="[
      prefixCls,
      {
        [`${prefixCls}--dark`]: isDark,
      },
    ]"
    @click="toggleDarkMode"
  >
    <div :class="`${prefixCls}-inner`"></div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { SvgIcon } from '/@/components/Icon'
  import { ThemeEnum } from '/@/enums/appEnums'
  import { updateDarkTheme } from '/@/logics/theme/dark'
  export default defineComponent({
    name: 'AppDarkModeToggle',
    components: {
      SvgIcon,
    },
    setup() {
      const { prefixCls } = useDesign('dark-mode-toggle')
      const { getDarkMode, getDarkModeToggle, setDarkMode } = useRootSetting()
      const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK)
      function toggleDarkMode() {
        const darkMode = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
        setDarkMode(darkMode)
        updateDarkTheme(darkMode)
        //  update headerColor  menuColor
      }
      return {
        prefixCls,
        toggleDarkMode,
        isDark,
        getDarkModeToggle,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-dark-mode-toggle';

  html[data-theme='dark'] {
    .@{prefix-cls} {
      border: 1px solid rgb(196, 188, 188);
    }
  }

  .@{prefix-cls} {
    position: relative;
    display: flex;
    width: 50px;
    height: 20px;
    padding: 0 6px;
    margin-left: auto;
    cursor: pointer;
    background-color: #151515;
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;

    &-inner {
      position: absolute;
      z-index: 1;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #fff;
      transition: transform 0.5s, background-color 0.5s;
      will-change: transform;
    }

    &--dark {
      .@{prefix-cls}-inner {
        transform: translateX(calc(100% + 2px));
      }
    }
  }
</style>
