type WithError = <F extends (...args: any[]) => any>(fn: F, ...args: Parameters<F>) => Promise<[Error] | [null, Awaited<ReturnType<F>>]>;

const withError: WithError = async (fn, ...args) => {
	if (typeof fn !== 'function') {
		throw Error('fn should be a function!');
	}

	try {
		return [null, await fn(...args)];
	} catch (e) {
		return [e as Error];
	}
}

export default withError;