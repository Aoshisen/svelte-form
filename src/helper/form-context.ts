import { getContext, setContext } from 'svelte';
import type { FormStoreAPI } from '../store/form';

const KEY = 'formStore';
export function getFormStoreContext(): FormStoreAPI {
  return getContext(KEY);
}
export function setFormStoreContext<T extends FormStoreAPI>(store: T): T {
  return setContext(KEY, store);
}