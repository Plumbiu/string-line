import { bench } from 'vitest'
import slm from '../index'
import sl from './index'

bench(
	'object benchmark',
	() => {
		for (let i = 0; i < 100; i++) {
			const diff = sl(`
    hello world
    你好世界
    world hello
    世界你好
  `)
			diff(`
    hello world!
    你好世界！
    world hello!
    世界你好！
  `)
		}
	},
	{ time: 100 },
)

bench(
	'map benchmark',
	() => {
		for (let i = 0; i < 100; i++) {
			const diff = slm(`
    hello world
    你好世界
    world hello
    世界你好
  `)

			diff(`
    hello world!
    你好世界！
    world hello!
    世界你好！
  `)
		}
	},
	{ time: 100 },
)
