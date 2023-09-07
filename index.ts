export default function (proxy: string, delimiter = /\n/) {
	const source = new Map<string, number>()
	const tokens = proxy.split(delimiter)
	for (const token of tokens) {
		const format = token.replace(/\t/, '').trim()
		if (format) {
			const count = source.get(format)
			if (count) source.set(format, count + 1)
			else source.set(format, 1)
		}
	}
	return (diffStr: string) => {
		const subs: string[] = []
		const adds: string[] = []
		const tokens = diffStr.split(delimiter)
		const target = new Map<string, number>()
		for (const token of tokens) {
			const format = token.replace(/\t/, '').trim()
			if (format) {
				const count = target.get(format)
				if (count) target.set(format, count + 1)
				else target.set(format, 1)
			}
		}
		for (const [key, count] of source.entries()) {
			const targetCount = target.get(key)
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
		for (const [key, count] of target.entries()) {
			const sourceCount = source.get(key)
			if (sourceCount) {
				if (sourceCount < count) {
					for (let i = 0; i < sourceCount - count; i++) adds.push(key)
				} else {
					for (let i = 0; i < count - sourceCount; i++) subs.push(key)
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
