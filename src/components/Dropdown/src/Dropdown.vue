<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <template v-for="item in dropMenulist" :key="`${item.event}`">
          <a-menu-item v-bind="getAttr(item.event)">
            <Popconfirm v-if="popconfirm && item.popconfirm" v-bind="item">
              <Icon v-if="item.icon" :icon="item.icon" />
              <span class="ml-1">{{ item.text }}</span>
            </Popconfirm>
            <template v-else>
              <Icon :icon="item.icon" v-if="item.icon" />
              <span class="ml-1">{{ item.text }}</span>
            </template>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { DropMenu } from './types'
  import { Dropdown, Menu, Popconfirm } from 'ant-design-vue'
  import Icon from '/@/components/Icon'
  export default defineComponent({
    name: 'BasicDropdown',
    components: {
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.Divider.name]: Menu.Divider,
      Popconfirm,
      Icon,
    },
    props: {
      trigger: {
        type: Array as PropType<string[]>,
        default: () => ['contextmenu'],
      },
      popconfirm: Boolean,
      dropMenulist: {
        type: Array as PropType<(DropMenu | Recordable)[]>,
        default: () => [],
      },
      selectedKeys: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    emits: ['menuEvent'],
    setup(props, { emit }) {
      function handleClickMenu(item: DropMenu) {
        const { event } = item
        const menu = props.dropMenulist.find((item) => `${item.event}` === `${event}`)
        emit('menuEvent', menu)
        item.onClick?.()
      }
      return {
        handleClickMenu,
        getAttr: (key: string | number) => ({ key }),
      }
    },
  })
</script>
