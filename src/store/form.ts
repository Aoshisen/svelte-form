import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface FormStore {
	[k: string]: any
}

const createFormStore = () => {
	const store: Writable<FormStore> = writable({});
	const { subscribe, update } = store;
	const base_changer = (values: Record<string, any>) => {
		update(p => ({ ...p, ...values }));
	}

	// 获取所有表单值
	function getFormValues(): Record<string, any> {
		return get({ subscribe });
	}
	const getFormItemValue = (key: string): any => {
		const values = getFormValues();
		return values[key];
	}
	const setFormValues = (values: Record<string, any>) => {
		base_changer(values);
	}
	const setFormItemValue = (key: string, value: any) => {
		base_changer({ [key]: value });
	}

	return {
		getFormValues,
		setFormValues,
		setFormItemValue,
		getFormItemValue,
		subscribe,
		form: store
	};
};
export type FormStoreAPI = ReturnType<typeof createFormStore>;


export { createFormStore }