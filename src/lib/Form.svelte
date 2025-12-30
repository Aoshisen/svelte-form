<script lang="ts">
  import { setContext } from "svelte";
  import { createFormStore } from "../store/form";

  // 定义组件属性
  export let initialValues = {};
  let values = {};
  export let onFormChange: (values: any) => void = () => {};
  export let onFormItemChange: (key: string, value: any) => void = () => {};
  // 创建表单 store
  const formStore = createFormStore({
    onFormChange,
    onFormItemChange,
  });

  if (Object.keys(initialValues).length > 0) {
    formStore.setFormValues(initialValues);
  }

  formStore.subscribe((vals) => {
    values = vals;
  });

  setContext("formStore", formStore);
</script>

<!-- Form 组件内容为空，只用于提供 context -->
<slot />
