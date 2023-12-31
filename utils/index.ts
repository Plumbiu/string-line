export function loadMap(str: string, delimiter = /(\n)|(\r\n)/) {
	const map = new Map<string, number>()
	const tokens = str.split(delimiter)
	for (const token of tokens) {
		const format = token.trim()
		if (format) {
			const count = map.get(format)
			if (count) map.set(format, count + 1)
			else map.set(format, 1)
		}
	}
	return map
}
