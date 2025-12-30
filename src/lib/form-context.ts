import { getContext } from 'svelte';
import type { FormStoreAPI } from '../store/form';
export function getFormStore(): FormStoreAPI {
  return getContext('formStore');
}