<script lang="ts">
	import Input from "./lib/Input.svelte";
	import Form from "./lib/Form.svelte";
	import FormItem from "./lib/FormItem.svelte";

	let initialValues = {
		username: "test",
		email: "bind:@example.com",
	};
	let values = {};
	const onFormChange = (vals: any) => {
		values = vals;
	};
	$: console.log("Form Values:", values);
</script>

<div class="container">
	<h1>Svelte Form Example</h1>

	<Form {initialValues} {onFormChange}>
		<FormItem name="username" let:value let:onChange>
			<Input {value} {onChange} />
		</FormItem>

		<FormItem name="email" let:value let:onChange>
			<Input {value} {onChange} />
		</FormItem>
	</Form>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
