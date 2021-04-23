<template>
  <LoginFormTitle class="enter-x" />
  <Form>
    <FormItem name="mobile">
      <Input size="large" :placeholder="t('sys.login.mobile')" />
    </FormItem>
    <FormItem> </FormItem>
    <FormItem class="enter-x">
      <Button size="large">
        {{ t('sys.login.loginButton') }}
      </Button>
      <Button size="large">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </FormItem>
  </Form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Form, Input, Button } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { useI18n } from '/@/hooks/web/usei18n'
  export default defineComponent({
    name: '',
    components: {
      LoginFormTitle,
      Form,
      Input,
      Button,
      FormItem: Form.Item,
    },
    setup() {
      const { t } = useI18n()
      return {
        t,
      }
    },
  })
</script>

<style scoped></style>
