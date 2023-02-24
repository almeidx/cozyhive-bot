export function noop() {}

/**
 * Unwraps an array if it only contains a single element.
 *
 * @param array - The array to unwrap
 */
export function unwrapArrayIfSingle<T>(array: T[]): T | T[] {
	if (array.length === 1) return array[0]!;
	return array;
}
