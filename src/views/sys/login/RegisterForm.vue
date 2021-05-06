<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="enter-x p-4" ref="formRef" :model="formData" :rules="getFormRules">
      <FormItem class="enter-x" name="account">
        <Input
          v-model:value="formData.account"
          size="large"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem class="enter-x" name="mobile">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem class="enter-x" name="sms">
        <CountDownInput
          v-model:value="formData.sms"
          size="large"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem class="enter-x" name="confirmPassword">
        <InputPassword
          size="large"
          v-model:value="formData.confirmPassword"
          visibilityToggle
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>
      <FormItem class="enter-x" name="policy">
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>
      <Button class="enter-x mt-4" type="primary" size="large" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button class="mt-4 enter-x" size="large" block @click="handleLoginBack">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, unref } from 'vue'
  import { Form, Button, Input, Checkbox } from 'ant-design-vue'
  import { LoginStateEnum, useFormRules, useFormValidate, useLoginState } from './useLogin'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { StrengthMeter } from '/@/components/StrengthMeter'
  import { CountDownInput } from '/@/components/CountDown'
  import { useI18n } from '/@/hooks/web/usei18n'
  export default defineComponent({
    components: {
      Form,
      FormItem: Form.Item,
      Button,
      Input,
      Checkbox,
      InputPassword: Input.Password,
      LoginFormTitle,
      CountDownInput,
      StrengthMeter,
    },
    setup() {
      const formRef = ref()
      const { getLoginState, handleLoginBack } = useLoginState()
      const { t } = useI18n()
      const formData = reactive({
        account: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        sms: '',
        policy: false,
      })
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)
      const { getFormRules } = useFormRules(formData)
      const { validate } = useFormValidate(formRef)
      async function handleRegister() {
        const data = await validate()
        if (!data) return
        console.log(data)
      }
      return {
        getShow,
        t,
        handleLoginBack,
        formRef,
        formData,
        getFormRules,
        handleRegister,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.ant-form-item-control-wrapper) {
    min-width: 100% !important;
  }
</style>
