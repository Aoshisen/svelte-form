<script lang="ts" module>
  import { createFormStore } from "../store/form";
  import { setFormStoreContext } from "../helper/form-context";
</script>

<script lang="ts">
  export let initialValues = {};
  export let onFormChange: (values: any) => void = () => {};
  export let onFormItemChange: (key: string, value: any) => void = () => {};

  let values = {};
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

  setFormStoreContext(formStore);
</script>

<slot />
