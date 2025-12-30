<script lang="ts">
  import { onMount } from "svelte";
  import { getFormStore } from "./form-context";

  export let name: string;
  export let initialValue: any = undefined;

  let value = "";
  let formStore: any;

  onMount(() => {
    formStore = getFormStore();

    // 设置初始值
    if (initialValue !== undefined) {
      formStore.setFormItemValue(name, initialValue);
    }

    // 订阅表单值变化
    formStore.subscribe((formValues: any) => {
      value = formValues[name] || "";
    });
  });

  // 处理值变化的函数
  function handleChange(newValue: any) {
    value = newValue;

    if (formStore) {
      formStore.setFormItemValue(name, newValue);
    }
  }
</script>

<slot {value} onChange={handleChange} />
