import type { VNode, CSSProperties } from 'vue'
import type { CollapseContainerOptions } from '/@/components/Container/index'
import type { DescriptionsProps } from 'ant-design-vue/es/descriptions/index'

export interface DescItem {
  labelWidth?: number
  contentMinWidth?: number
  labelStyle?: CSSProperties
  field: string
  label: string | VNode | JSX.Element
  span?: number
  show?: (...args: any[]) => boolean
  render?: (
    val: any,
    data: Recordable
  ) => VNode | undefined | JSX.Element | Element | string | number
}

export interface DescOptions extends DescriptionsProps {
  useCollapse?: boolean
  schema: DescItem[]
  data: Recordable
  collapseOptions?: CollapseContainerOptions
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescOptions>): void
}

export type Register = (descInstance: DescInstance) => void

export type UseDescReturnType = [Register, DescInstance]
