export type Rule = {
  required?: boolean;
  type?: 'number' | 'string' | string;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  message?: string;
  validator?: (rule: Rule, value: any) => boolean | Promise<boolean> | void | Promise<void>;
};

export const validateRequired = (rule: Rule, val: any): string | null => {
  if (!rule.required) return null;
  const isEmpty = val === undefined || val === null || val === '';
  if (isEmpty) return rule.message || 'This field is required';
  return null;
};

export const validatePattern = (rule: Rule, val: any): string | null => {
  if (!rule.pattern) return null;
  const pat = rule.pattern instanceof RegExp ? rule.pattern : new RegExp(String(rule.pattern));
  const str = val === undefined || val === null ? '' : String(val);
  if (!pat.test(str)) {
    return rule.message || 'Value does not match pattern';
  }
  return null;
};

export const validateLength = (rule: Rule, val: any): string | null => {
  if (typeof val !== 'string') return null;

  if (rule.min !== undefined && val.length < rule.min) {
    return rule.message || `Minimum length is ${rule.min}`;
  }

  if (rule.max !== undefined && val.length > rule.max) {
    return rule.message || `Maximum length is ${rule.max}`;
  }

  return null;
};

export const validateNumber = (rule: Rule, val: any): string | null => {
  // only validate when rule.type explicitly set to 'number'
  if (rule.type !== 'number') return null;
  if (val === undefined || val === null || val === '') return null;

  const num = typeof val === 'number' ? val : Number(val);
  if (Number.isNaN(num)) return rule.message || 'Value is not a number';

  if (rule.min !== undefined && num < rule.min) {
    return rule.message || `Minimum is ${rule.min}`;
  }

  if (rule.max !== undefined && num > rule.max) {
    return rule.message || `Maximum is ${rule.max}`;
  }

  return null;
};

export const validateCustom = async (rule: Rule, val: any): Promise<string | null> => {
  if (typeof rule.validator !== 'function') return null;

  try {
    const res = rule.validator(rule, val);
    if (res instanceof Promise) {
      const awaited = await res;
      if (awaited === false) return rule.message || 'Validation failed';
      return null;
    }
    if (res === false || res === undefined) {
      return rule.message || 'Validation failed';
    }
    return null;
  } catch (e: any) {
    return e?.message || rule.message || 'Validation error';
  }
};


export default {
  validateRequired,
  validatePattern,
  validateLength,
  validateNumber,
  validateCustom,
};
