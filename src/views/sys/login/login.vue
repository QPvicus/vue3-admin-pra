<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <AppDarkModeToggle class="absolute top-4 right-4 enter-x text-white xl:text-gray-600" />

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden xl:flex xl:flex-col xl:w-6/12 min-h-full mr-4 pl-4">
          <AppLogo class="-enter-x" />
          <div class="my-auto">
            <img src="../../../assets/svg/login-box-bg.svg" class="w-1/2 -mt-16 -enter-x" />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="mt-4 text-3xl inline-block"> {{ t('sys.login.signInTitle') }}</span>
            </div>
            <div class="mt-5 text-md text-white font-normal dark:text-gray-500 -enter-x">
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="h-full xl:h-auto flex py-5 xl:py-0 xl:my-0 w-full xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="
              my-auto
              mx-auto
              xl:ml-20
              xl:bg-transparent
              px-5
              py-8
              sm:px-8
              xl:p-4
              rounded-md
              shadow-md
              xl:shadow-none
              w-full
              sm:w-3/4
              lg:w-2/4
              xl:w-auto
              enter-x
              relative
            "
          >
            <LoginForm />
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
            <QrCodeForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LoginForm from './LoginForm.vue'
  import MobileForm from './MobileForm.vue'
  import QrCodeForm from './QrCodeForm.vue'
  import RegisterForm from './RegisterForm.vue'
  import ForgetPasswordForm from './ForgetPasswordForm.vue'
  import AppLogo from '/@/components/Application/src/AppLogo.vue'
  import { AppDarkModeToggle } from '/@/components/Application'
  import { useI18n } from '/@/hooks/web/usei18n'
  import { useDesign } from '/@/hooks/web/useDesign'
  export default defineComponent({
    name: 'Login',
    components: {
      LoginForm,
      AppLogo,
      MobileForm,
      QrCodeForm,
      RegisterForm,
      ForgetPasswordForm,
      AppDarkModeToggle,
    },
    setup() {
      const { t } = useI18n()
      const { prefixCls } = useDesign('login')
      return {
        t,
        prefixCls,
      }
    },
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  .@{prefix-cls} {
    overflow: hidden;
    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url(/@/assets/svg/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          font-size: 24px;
          color: #fff;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 340px;

      @media (max-width: @screen-lg) {
        min-width: 300px;
      }

      @media (max-width: @screen-md) {
        min-width: 260px;
      }

      @media (max-width: @screen-sm) {
        min-width: 180px;
      }
    }
    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      font-size: 12px;
      color: @text-color-secondary;
    }
  }
</style>
