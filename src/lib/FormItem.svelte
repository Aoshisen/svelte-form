<script lang="ts" module>
  import { compact } from "lodash-es";
  import { getFormStoreContext } from "../helper/form-context";
</script>

<script lang="ts">
  export let name: string;
  export let initialValue: any = undefined;
  export let rules: any[] = [];

  import {
    validateRequired,
    validatePattern,
    validateLength,
    validateNumber,
    validateCustom,
  } from "../helper/validators";

  let value = "";
  let formStore = getFormStoreContext();
  let errors: string[] = [];

  const runRules = async (val: any) => {
    if (!rules || rules.length === 0) return { valid: true, errors: [] };
    const errors: string[] = [];
    for (const rule of rules) {
      const reqErr = validateRequired(rule, val);

      const numErr = validateNumber(rule, val);

      const patErr = validatePattern(rule, val);

      const lenErr = validateLength(rule, val);

      const customErr = await validateCustom(rule, val);

      errors.push(...compact([reqErr, numErr, patErr, lenErr, customErr]));
    }

    return { valid: errors.length === 0, errors };
  };

  // 设置初始值
  if (initialValue !== undefined) {
    formStore.setFormItemValue(name, initialValue);
  }

  // 订阅表单值变化
  formStore.subscribe((formValues: any) => {
    value = formValues[name] || "";
  });

  // 处理值变化的函数
  const handleChange = async (newValue: any) => {
    value = newValue;
    if (formStore) {
      formStore.setFormItemValue(name, newValue);
    }
    const res = await runRules(newValue);
    errors = res.errors;
  };
</script>

<slot {value} onChange={handleChange} {errors} />

{#if errors && errors.length > 0}
  <div class="form-item-error">{errors[0]}</div>
{/if}

<style>
  .form-item-error {
    color: #ff4d4f;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
