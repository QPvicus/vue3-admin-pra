<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData">
      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountDownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem class="enter-x">
        <Button size="large" type="primary" block>
          {{ t('sys.login.loginButton') }}
        </Button>
        <Button class="mt-4" size="large" block @click="handleLoginBack">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, unref } from 'vue'
  import { Form, Input, Button } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { CountDownInput } from '/@/components/CountDown'
  import { useI18n } from '/@/hooks/web/usei18n'
  import { LoginStateEnum, useLoginState } from './useLogin'
  export default defineComponent({
    name: '',
    components: {
      LoginFormTitle,
      Form,
      Input,
      Button,
      FormItem: Form.Item,
      CountDownInput,
    },
    setup() {
      const { t } = useI18n()
      const { getLoginState, handleLoginBack } = useLoginState()
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)
      const formData = reactive({
        mobile: '',
        sms: '',
      })
      return {
        t,
        getShow,
        handleLoginBack,
        formData,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.ant-form-item-control-wrapper) {
    min-width: 100% !important;
  }
</style>
