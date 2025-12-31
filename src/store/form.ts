import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface FormStore {
	[k: string]: any
}
const createFormStore = ({
	onFormChange = (values: Record<string, any>) => { },
	onFormItemChange = (key: string, value: any) => { }
}) => {
	const store: Writable<FormStore> = writable({});
	const { subscribe, update } = store;
	const base_changer = (values: Record<string, any>) => {
		update(p => ({ ...p, ...values }));
		return getFormValues();
	}
	// 获取所有表单值
	const getFormValues = () => {
		return get({ subscribe });
	}
	const getFormItemValue = (key: string): any => {
		const values = getFormValues();
		return values[key];
	}
	const setFormValues = (values: Record<string, any>) => {
		const newValues = base_changer(values);
		onFormChange?.(newValues);
	}
	const setFormItemValue = (key: string, value: any) => {
		const newValues = base_changer({ [key]: value });
		onFormItemChange?.(key, value);
		onFormChange?.(newValues);
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

export type FormStoreOptions = Parameters<typeof createFormStore>;

export type FormStoreAPI = ReturnType<typeof createFormStore>;

export { createFormStore }