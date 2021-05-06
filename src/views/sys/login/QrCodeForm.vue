<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <Divider class="enter-x">
        {{ t('sys.login.scanSign') }}
      </Divider>
      <Button class="enter-x" @click="handleLoginBack" block size="large">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { Button, Divider } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { useI18n } from '/@/hooks/web/usei18n'
  import { LoginStateEnum, useLoginState } from './useLogin'
  export default defineComponent({
    components: {
      LoginFormTitle,
      Button,
      Divider,
    },
    setup() {
      const { t } = useI18n()
      const { getLoginState, handleLoginBack } = useLoginState()
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
      return {
        t,
        handleLoginBack,
        getShow,
      }
    },
  })
</script>
