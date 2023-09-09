import { loadMap } from './utils'

export default function (proxy: string, delimiter: RegExp) {
	const source = loadMap(proxy, delimiter)
	return (diffStr: string) => {
		const target = loadMap(diffStr, delimiter)
		const subs: string[] = []
		const adds: string[] = []
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
