<script lang="tsx">
  import { defineComponent } from 'vue'
  import { useGo } from '/@/hooks/web/useGo'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {},
    setup() {
      const go = useGo()
      return {
        go,
      }
    },
  })
</script>
