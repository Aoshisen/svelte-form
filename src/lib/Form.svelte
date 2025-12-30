<script>
  import { setContext } from "svelte";
  import { createFormStore } from "../store/form";

  // 定义组件属性
  export let initialValues = {};

  // 创建表单 store
  const formStore = createFormStore();

  // 如果提供了初始值，则设置它们
  if (Object.keys(initialValues).length > 0) {
    formStore.setFormValues(initialValues);
  }

  // 通过 context 共享 store
  setContext("formStore", formStore);
</script>

<!-- Form 组件内容为空，只用于提供 context -->
<slot />
