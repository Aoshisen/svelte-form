import { getContext, setContext } from 'svelte';
import type { FormStoreAPI } from '../store/form';
export function getFormStoreContext(): FormStoreAPI {
  return getContext('formStore');
}

export function setFormStoreContext(store: FormStoreAPI): FormStoreAPI {
  return setContext('formStore', store);
}