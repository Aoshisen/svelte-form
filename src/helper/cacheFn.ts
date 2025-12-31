type CreateCachedAsyncFn = <F extends (...args: any[]) => any>(fn: F) => (...args: Parameters<F>) => Promise<ReturnType<F> | null>;
const createCachedAsyncFn: CreateCachedAsyncFn = (fn) => {
	let cachedData: any = undefined;

	return async (...args: any[]) => {
		if (cachedData === undefined) {
			return cachedData;
		}
		const result = await fn(...args);

		cachedData = result || null;
		return cachedData;
	};
}

export { createCachedAsyncFn };