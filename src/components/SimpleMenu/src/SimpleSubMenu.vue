<template>
  <MenuItem
    :name="item.path"
    v-if="!menuHasChildren(item) && getShowMenu"
    v-bind="$props"
    :class="getLevelClass"
  >
    <Icon v-if="getIcon" :icon="getIcon" :szie="16" />
    <div v-if="collapseShowTitle && getIsCollapseParent" class="mt-1 collapse-title">
      {{ getI18nName }}
    </div>
    <template #title>
      <span :class="['ml-2', `${prefixCls}-sub-title`]">
        {{ getI18nName }}
      </span>
      <SimpleMenuTag :item="item" :collapseParent="getIsCollapseParent" />
    </template>
  </MenuItem>
  <SubMenu
    :name="item"
    v-if="menuHasChildren(item) && getShowMenu"
    :class="[getLevelClass, theme]"
    :collapseShowTitle="collapseShowTitle"
  >
    <template #title>
      <Icon v-if="getIcon" :icon="getIcon" :size="16" />

      <div v-if="collapseShowTitle && getIsCollapseParent" class="mt-2 collapse-title">
        {{ getI18nName }}
      </div>
      <span v-show="getShowSubTitle" :class="['mt-2', `${prefixCls}-sub-title`]">
        {{ getI18nName }}
      </span>
      <SimpleMenuTag :item="item" :collapseParent="!!collapse && !!parent" />
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SimpleSubMenu v-bind="$props" :item="childrenItem" :parent="false" />
    </template>
  </SubMenu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import MenuItem from './components/MenuItem.vue'
  import SubMenu from './components/SubMenuItem.vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  // import { useI18n } from '/@/hooks/web/usei18n'
  import { Menu } from '/@/router/types'
  import { propTypes } from '/@/utils/propTypes'
  import Icon from '/@/components/Icon'
  import SimpleMenuTag from './SimpleMenuTag.vue'
  export default defineComponent({
    name: 'SimpleSubMenu',
    components: {
      MenuItem,
      Icon,
      SimpleMenuTag,
      SubMenu,
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
