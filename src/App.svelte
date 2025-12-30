<script>
  import Form from './lib/Form.svelte';
  import Input from './lib/Input.svelte';
  import { getFormStore } from './lib/form-context';

  let formStore;
  let submittedValues = {};

  function handleSubmit() {
    formStore = getFormStore();
    submittedValues = formStore.getFormValues();
    console.log('提交的表单值:', submittedValues);
  }
  
  function handleReset() {
    formStore = getFormStore();
    formStore.setFormValues({});
  }
</script>

<div class="container">
  <h1>Svelte 表单示例</h1>
  
  <Form initialValues={{ username: 'default', email: 'default@example.com' }}>
    <div class="form-group">
      <label>用户名:</label>
      <Input name="username" initialValue="john_doe" />
    </div>
    
    <div class="form-group">
      <label>邮箱:</label>
      <Input name="email" />
    </div>
    
    <div class="form-group">
      <label>电话:</label>
      <Input name="phone" />
    </div>
    
    <button type="button" on:click={handleSubmit}>提交</button>
    <button type="button" on:click={handleReset}>重置</button>
  </Form>
  
  <div class="result">
    <h3>提交的值:</h3>
    <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 15px;
    margin-right: 10px;
    background-color: #007cba;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #005a87;
  }
  
  .result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
</style>