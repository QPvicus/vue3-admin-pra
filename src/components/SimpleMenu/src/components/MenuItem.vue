<template>
  <li :class="getClass" :style="getCollapse ? {} : getItemStyle" @click.stop="handleClickItem">
    <Tooltip v-if="showTooptip" placement="right">
      <template #title>
        <slot name="title"></slot>
      </template>
      <div :class="`${prefixCls}-tooltip`">
        <slot></slot>
      </div>
    </Tooltip>

    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, PropType, ref, unref, watch } from 'vue'
  import { useSimpleRootMenuContext } from './useSimpleMenuContext'
  import { useMenuItem } from './useMenu'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { propTypes } from '/@/utils/propTypes'
  import { Tooltip } from 'ant-design-vue'
  export default defineComponent({
    name: 'MenuItem',
    components: {
      Tooltip,
    },
    props: {
      name: {
        type: [String, Number] as PropType<string | number>,
        require: true,
      },
      disabled: propTypes.bool,
    },
    setup(props, { slots }) {
      const instance = getCurrentInstance()

      const active = ref(false)

      const { getItemStyle, getParentList, getParentMenu, getParentRootMenu } =
        useMenuItem(instance)

      const { prefixCls } = useDesign('menu')

      const { rootMenuEmitter, activeName } = useSimpleRootMenuContext()

      const getClass = computed(() => {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: unref(active),
            [`${prefixCls}-item-selected`]: unref(active),
            [`${prefixCls}-item-disabled`]: !!props.disabled,
          },
        ]
      })
      const getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse)

      const showTooptip = computed(() => {
        return unref(getParentMenu)?.type.name === 'Menu' && unref(getCollapse) && slots.title
      })

      function handleClickItem() {
        const { disabled } = props
        if (disabled) {
          return
        }

        rootMenuEmitter.emit('on-menu-item-select', props.name)
        if (unref(getCollapse)) {
          return
        }
        const { uidList } = getParentList()

        rootMenuEmitter.emit('on-update-opened', {
          opend: false,
          parent: instance?.parent,
          uidList: uidList,
        })
      }
      watch(
        () => activeName.value,
        (name: string) => {
          if (name === props.name) {
            const { list, uidList } = getParentList()
            active.value = true
            list.forEach((item) => {
              if (item.proxy) {
                ;(item.proxy as any).active = true
              }
            })

            rootMenuEmitter.emit('on-update-active-name:submenu', uidList)
          } else {
            active.value = false
          }
        },
        { immediate: true }
      )

      return {
        prefixCls,
        showTooptip,
        getClass,
        getCollapse,
        getItemStyle,
        handleClickItem,
      }
    },
  })
</script>
