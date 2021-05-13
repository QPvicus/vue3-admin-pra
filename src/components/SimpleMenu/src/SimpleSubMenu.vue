<template>
  <MenuItem
    :name="item.path"
    v-if="!menuHasChildren(item) && getShowMenu"
    v-bind="$props"
    :class="getLevelClass"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import MenuItem from './components/MenuItem.vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  // import { useI18n } from '/@/hooks/web/usei18n'
  import { Menu } from '/@/router/types'
  import { propTypes } from '/@/utils/propTypes'
  export default defineComponent({
    name: 'SimpleSubMenu',
    components: {
      MenuItem,
    },
    props: {
      item: {
        type: Object as PropType<Menu>,
        default: () => ({}),
      },
      parent: propTypes.bool,
      collapseShowTitle: propTypes.bool,
      collapse: propTypes.bool,
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup(props) {
      // const { t } = useI18n()
      const { prefixCls } = useDesign('simple-menu')

      const getShowMenu = computed(() => !props.item?.meta?.hideMenu)
      const getIcon = computed(() => props.item?.icon)
      const getI18nName = computed(() => props.item?.name)
      const getShowSubTitle = computed(() => !props.collapse || !props.parent)
      const getIsCollapseParent = computed(() => !!props.collapse && !!props.parent)
      const getLevelClass = computed(() => {
        return [
          {
            [`${prefixCls}-parent`]: props.parent,
            [`${prefixCls}-children`]: !props.parent,
          },
        ]
      })

      function menuHasChildren(menuTreeItem: Menu): boolean {
        return (
          !menuTreeItem?.meta?.hideChildrenMenu &&
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        )
      }

      return {
        prefixCls,
        menuHasChildren,
        getShowMenu,
        getIcon,
        getI18nName,
        getShowSubTitle,
        getIsCollapseParent,
        getLevelClass,
      }
    },
  })
</script>
