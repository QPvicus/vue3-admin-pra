<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form ref="formRef" class="p-4 enter-x" v-show="getShow" :model="formData" :rules="getFormRules">
    <FormItem name="account">
      <Input
        size="large"
        class="enter-x"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
      />
    </FormItem>
    <FormItem name="password">
      <InputPassword
        size="large"
        class="enter-x"
        v-model:value="formData.password"
        visibilityToggle
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>
    <FormItem class="enter-x min-w-full">
      <Button block type="primary" size="large" :loading="loading" @click="handleLogin">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>

    <ARow>
      <ACol :xs="24" :md="8">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.signUpFormTitle') }}
        </Button>
      </ACol>
    </ARow>
    <Divider>{{ t('sys.login.otherSignIn') }}</Divider>
    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, toRaw, unref } from 'vue'
  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue'
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { useLoginState, LoginStateEnum, useFormRules, useFormValidate } from './useLogin'
  import { useI18n } from '/@/hooks/web/usei18n'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { onKeyStroke } from '@vueuse/core'
  import { useUserStore } from '/@/store/modules/user'
  import { useMessage } from '/@/hooks/web/useMessage'
  export default defineComponent({
    name: 'LoginForm',
    components: {
      LoginFormTitle,
      Checkbox,
      Form,
      Input,
      [Row.name]: Row,
      [Col.name]: Col,
      Button,
      Divider,
      FormItem: Form.Item,
      InputPassword: Input.Password,
      GithubFilled,
      WechatFilled,
      AlipayCircleFilled,
      GoogleCircleFilled,
      TwitterCircleFilled,
    },
    setup() {
      const { getLoginState, setLoginState } = useLoginState()
      const { t } = useI18n()
      const { prefixCls } = useDesign('login')
      const { getFormRules } = useFormRules()
      const userStore = useUserStore()
      const { notification } = useMessage()
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
      const formRef = ref()
      const rememberMe = ref(false)
      const loading = ref(false)
      const formData = reactive({
        account: 'vben',
        password: '123456',
      })

      const { validate } = useFormValidate(formRef)

      onKeyStroke('enter', handleLogin)

      async function handleLogin() {
        const data = await validate()
        console.log(data)
        if (!data) return
        try {
          loading.value = true
          const userInfo = await userStore.login(
            toRaw({
              username: data.account,
              password: data.password,
            })
          )
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')} ${userInfo.realName}`,
              duration: 3,
            })
          }
        } finally {
          loading.value = false
        }
      }

      return {
        t,
        formRef,
        getShow,
        prefixCls,
        loading,
        rememberMe,
        formData,
        setLoginState,
        LoginStateEnum,
        getFormRules,
        handleLogin,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.ant-form-item-control-wrapper) {
    min-width: 100% !important;
  }
</style>
