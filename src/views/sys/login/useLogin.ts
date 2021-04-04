import { computed, Ref, ref, unref } from 'vue'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleLoginBack() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleLoginBack }
}

export function useFormValidate<T extends Object = any>(formRef: Ref<any>) {
  async function validate() {
    const form = unref(formRef)
    if (!form) return
    const date = await form.validate()
    return date as T
  }

  return { validate }
}

export function useFormRules(formDate?: Recordable) {}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ]
}
