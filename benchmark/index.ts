export default function (proxy: string, delimiter = /\n/) {
	const source: Record<string, number> = {}
	const tokens = proxy.split(delimiter)
	for (const token of tokens) {
		const format = token.replace(/\t/, '').trim()
		if (format) {
			if (source[format]) source[format] = source[format] + 1
			else source[format] = 1
		}
	}
	return (diffStr: string) => {
		const subs: string[] = []
		const adds: string[] = []
		const tokens = diffStr.split(delimiter)
		const target: Record<string, number> = {}
		for (const token of tokens) {
			const format = token.replace(/\t/, '').trim()
			if (format) {
				if (target[format]) target[format] = source[format] + 1
				else target[format] = 1
			}
		}
		for (const [key, count] of Object.entries(source)) {
			const targetCount = target[key]
			if (targetCount) {
				if (targetCount > count) {
					for (let i = 0; i < targetCount - count; i++) adds.push(key)
				} else {
					for (let i = 0; i < count - targetCount; i++) subs.push(key)
				}
			} else {
				subs.push(key)
			}
		}
		for (const [key, count] of Object.entries(target)) {
			const objCOunt = source[key]
			if (objCOunt) {
				if (objCOunt < count) {
					for (let i = 0; i < objCOunt - count; i++) adds.push(key)
				} else {
					for (let i = 0; i < count - objCOunt; i++) subs.push(key)
				}
			} else {
				adds.push(key)
			}
		}
		return {
			subs,
			adds,
		}
	}
}
