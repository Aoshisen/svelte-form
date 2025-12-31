import { z } from 'zod';
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
  const schema = z.any().refine((v) => !(v === undefined || v === null || v === ''), {
    message: rule.message || 'This field is required',
  });
  const res = schema.safeParse(val);
  if (!res.success) return res.error.issues[0]?.message ?? rule.message ?? 'This field is required';
  return null;
};

export const validatePattern = (rule: Rule, val: any): string | null => {
  if (!rule.pattern) return null;
  const pat = rule.pattern instanceof RegExp ? rule.pattern : new RegExp(String(rule.pattern));
  const str = val === undefined || val === null ? '' : String(val);
  const schema = z.string().regex(pat, { message: rule.message || 'Value does not match pattern' });
  const res = schema.safeParse(str);
  if (!res.success) return res.error.issues[0]?.message ?? rule.message ?? 'Value does not match pattern';
  return null;
};

export const validateLength = (rule: Rule, val: any): string | null => {
  if (typeof val !== 'string') return null;
  let schema = z.string();
  if (rule.min !== undefined) schema = schema.min(rule.min, { message: rule.message || `Minimum length is ${rule.min}` });
  if (rule.max !== undefined) schema = schema.max(rule.max, { message: rule.message || `Maximum length is ${rule.max}` });
  const res = schema.safeParse(val);
  console.log('Length validation result:', res);
  if (!res.success) return res.error.issues[0]?.message ?? rule.message ?? `Length validation failed`;
  return null;
};

export const validateNumber = (rule: Rule, val: any): string | null => {
  // only validate when rule.type explicitly set to 'number'
  if (rule.type !== 'number') return null;
  if (val === undefined || val === null || val === '') return null;
  const num = typeof val === 'number' ? val : Number(val);
  if (Number.isNaN(num)) return rule.message || 'Value is not a number';
  let schema = z.number();
  if (rule.min !== undefined) schema = schema.min(rule.min, { message: rule.message || `Minimum is ${rule.min}` });
  if (rule.max !== undefined) schema = schema.max(rule.max, { message: rule.message || `Maximum is ${rule.max}` });
  const res = schema.safeParse(num);
  if (!res.success) return res.error.issues[0]?.message ?? rule.message ?? 'Number validation failed';
  return null;
};

export const validateCustom = async (rule: Rule, val: any): Promise<string | null> => {
  if (typeof rule.validator !== 'function') return null;
  // use zod async refine to run custom validator
  const schema = z.any().refine(async (v) => {
    try {
      const res = rule.validator!(rule, v);
      if (res instanceof Promise) {
        const awaited = await res;
        return awaited !== false;
      }
      return res !== false;
    } catch (e) {
      // reject on exception
      return false;
    }
  }, { message: rule.message || 'Validation failed' });

  try {
    const res = await schema.safeParseAsync(val);
    if (!res.success) return res.error.issues[0]?.message ?? rule.message ?? 'Validation failed';
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
