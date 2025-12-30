<script lang="ts">
  export let value;
  export let onChange: (value: string) => void = () => {};
  const handleChange = (e: any) => {
    onChange?.(e.target.value);
  };
</script>

<input type="text" {value} on:input={handleChange} />
