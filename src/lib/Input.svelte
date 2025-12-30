<script>
  import { onMount } from 'svelte';
  import { getFormStore } from './form-context';

  export let name: string;
  export let initialValue: any = '';

  let value = '';
  let formStore;

  onMount(() => {
    formStore = getFormStore();
    
    // 设置初始值
    if (initialValue !== undefined) {
      formStore.setFormItemValue(name, initialValue);
    }
    
    // 订阅表单值变化
    formStore.subscribe((formValues) => {
      value = formValues[name] || '';
    });
  });

  function handleChange(event) {
    const newValue = event.target.value;
    value = newValue;
    
    if (formStore) {
      formStore.setFormItemValue(name, newValue);
    }
  }
</script>

<input 
  type="text" 
  name={name} 
  bind:value 
  on:input={handleChange} 
/>