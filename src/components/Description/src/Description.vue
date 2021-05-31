<script lang="tsx">
  import type { DescOptions, DescInstance, DescItem } from './types'
  import type { DescriptionsProps } from 'ant-design-vue/es/descriptions/index'
  import { CollapseContainer } from '/@/components/Container/index'
  import { Descriptions } from 'ant-design-vue'
  import { computed, CSSProperties, ref, unref } from 'vue'
  import descProps from './props'
  import { defineComponent } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { CollapseContainerOptions } from '/@/components/Container'
  import { useAttrs } from '/@/hooks/core/useAttrs'
  import { isFunction } from '/@/utils/is'
  import { get } from 'lodash-es'
  import { getSlot } from '/@/utils/helper/tsxHelper'

  export default defineComponent({
    name: 'Description',
    props: descProps,
    emits: ['register'],
    setup(props, { emit, slots }) {
      const propsRef = ref<Partial<DescOptions> | null>(null)
      const { prefixCls } = useDesign('description')
      const attrs = useAttrs()
      const getMergeProps = computed(() => {
        return {
          ...props,
          ...(unref(propsRef) as Recordable),
        } as DescOptions
      })

      const getProps = computed(() => {
        const opt = {
          ...unref(getMergeProps),
          title: undefined,
        }
        return opt as DescOptions
      })

      const useWrapper = computed(() => !!unref(getMergeProps).title)
      const getCollapseOptions = computed((): CollapseContainerOptions => {
        return {
          canExpand: false,
          ...unref(getProps).collapseOptions,
        }
      })

      const getDescriptionsProps = computed(() => {
        return { ...attrs, ...unref(getProps) } as DescriptionsProps
      })
      function setDescProps(descProps: Partial<DescOptions>): void {
        propsRef.value = {
          ...propsRef,
          ...descProps,
        } as Recordable
      }

      function renderLabel({ label, labelWidth, labelStyle }: DescItem) {
        if (!labelWidth || !labelStyle) return label
        const labelStyles: CSSProperties = {
          ...labelStyle,
          minHeight: `${labelWidth}px`,
        }
        return <div style={labelStyles}>{label}</div>
      }

      function renderItem() {
        const { schema, data } = unref(getProps)
        return unref(schema).map((item) => {
          const { render, field, span, show, contentMinWidth } = item
          if (show && isFunction(show) && !show(data)) {
            return null
          }
          const getContent = () => {
            const _data = unref(getProps)?.data
            if (!_data) return null
            const getField = get(_data, field)
            return isFunction(render) ? render(getField, _data) : getField ?? ''
          }
          const width = contentMinWidth
          return (
            <Descriptions.Item label={renderLabel(item)} key={field} span={span}>
              {() => {
                if (!contentMinWidth) {
                  return getContent()
                }
                const style: CSSProperties = {
                  minWidth: `${width}px`,
                }
                return <div style={style}>{getContent()}</div>
              }}
            </Descriptions.Item>
          )
        })
      }

      const renderDesc = () => {
        return (
          <Descriptions class={`${prefixCls}`} {...unref(getDescriptionsProps)}>
            {renderItem()}
          </Descriptions>
        )
      }

      const renderContainer = () => {
        const content = props.useCollapse ? renderDesc() : <div>{renderDesc()}</div>
        if (!props.useCollapse) {
          return content
        }
        const { canExpand, helpMessage } = unref(getCollapseOptions)
        const { title } = unref(getMergeProps)
        return (
          <CollapseContainer title={title} canExpan={canExpand} helpMessage={helpMessage}>
            {{
              default: () => content,
              action: () => getSlot(slots, 'action'),
            }}
          </CollapseContainer>
        )
      }

      const methods: DescInstance = {
        setDescProps,
      }
      emit('register', methods)

      return () => (unref(useWrapper) ? renderContainer() : renderDesc())
    },
  })
</script>
