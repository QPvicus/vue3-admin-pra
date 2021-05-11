<template>
  <ul class="getClass">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    PropType,
    provide,
    ref,
    watch,
    watchEffect,
  } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import Mitt from '/@/utils/mitt'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { createSimpleMenuContext } from './useSimpleMenuContext'
  import type { SubMenuProvider } from './types'
  export default defineComponent({
    props: {
      theme: propTypes.oneOf(['light', 'dark']).def('dark'),
      activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
      openNames: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      //  开启手风琴模式
      accordion: propTypes.bool.def(true),
      width: propTypes.string.def('100%'),
      collapsedWidth: propTypes.string.def('48px'),
      indentSize: propTypes.number.def(16),
      collapse: propTypes.bool.def(true),
      activeSubMenuNames: {
        type: Array as PropType<(string | number)[]>,
        default: () => [],
      },
    },
    emits: ['select'],
    setup(props, { emit }) {
      const rootMenuEmitter = new Mitt()
      const instance = getCurrentInstance()
      const currentActiveName = ref<string | number>('')
      const openedNames = ref<string[]>([])

      const { prefixCls } = useDesign('menu')
      const isRemoveAllPopup = ref(false)

      createSimpleMenuContext({ rootMenuEmitter, activeName: currentActiveName })

      const getClass = computed(() => {
        const { theme } = props
        return [
          prefixCls,
          `${prefixCls}-${theme}`,
          `${prefixCls}-vertical`,
          {
            [`${prefixCls}-collapse`]: props.collapse,
          },
        ]
      })

      watchEffect(() => {
        openedNames.value = props.openNames
      })
      watchEffect(() => {
        if (props.activeName) {
          currentActiveName.value = props.activeName
        }
      })
      watch(
        () => props.openNames,
        () => {
          nextTick(() => {
            updateOpened()
          })
        }
      )

      function updateOpened() {
        rootMenuEmitter.emit('on-update-opened', openedNames.value)
      }

      function addSubMenu(name: string) {
        if (openedNames.value.includes(name)) return
        openedNames.value.push(name)
        updateOpened()
      }
      function removeSubMenu(name: string) {
        openedNames.value = openedNames.value.filter((item) => item !== name)
        updateOpened()
      }

      function removeAll() {
        openedNames.value = []
        updateOpened()
      }

      function sliceIndex(index: number) {
        openedNames.value = openedNames.value.slice(0, index)
        updateOpened()
      }

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        addSubMenu,
        removeSubMenu,
        removeAll,
        isRemoveAllPopup,
        sliceIndex,
        level: 0,
        props,
        getOpenNames: () => openedNames.value,
      })

      onMounted(() => {
        openedNames.value = !props.collapse ? [...props.openNames] : []
        updateOpened()
        rootMenuEmitter.on('on-menu-item-select', (name: string) => {
          currentActiveName.value = name
          nextTick(() => {
            props.collapse && removeAll()
          })
          emit('select', name)
        })

        rootMenuEmitter.on('open-name-change', ({ name, opened }) => {
          if (opened && !openedNames.value.includes(name)) {
            openedNames.value.push(name)
          } else if (!opened) {
            const index = openedNames.value.findIndex((item) => item === name)
            index !== -1 && openedNames.value.splice(index, 1)
          }
        })
      })

      return {
        getClass,
        openedNames,
      }
    },
  })
</script>

<style lang="less">
  @import './menu.less';
</style>
