import { test, describe, expect } from 'vitest'
import sl from '../index'

describe('string diff', () => {
	test('sub', () => {
		const str = `
			hello world
		`
		const diff = sl(str)
		const newStr = ''
		expect(diff(newStr)).toEqual({
			subs: ['hello world'],
			adds: [],
		})
	})

	test('add', () => {
		const str = ''
		const diff = sl(str)
		const newStr = `
			hello world
		`
		expect(diff(newStr)).toEqual({
			subs: [],
			adds: ['hello world'],
		})
	})

	test('more complicated add', () => {
		const str = `
			hello world
		`
		const diff = sl(str)
		const newStr = `
			hello world
			你好世界
			hello world
		`
		expect(diff(newStr)).toEqual({
			subs: [],
			adds: ['hello world', '你好世界'],
		})
	})

	test('more complicated sub', () => {
		const str = `
			hello world
			你好世界
			hello world
		`
		const diff = sl(str)
		const newStr = `
			hello world
		`
		expect(diff(newStr)).toEqual({
			subs: ['hello world', '你好世界'],
			adds: [],
		})
	})

	test('sub and add', () => {
		const str = `
			hello world
			你好世界
			hello world
		`
		const diff = sl(str)
		const newStr = `
			hello world
			世界你好
			world hello
		`
		expect(diff(newStr)).toEqual({
			subs: ['hello world', '你好世界'],
			adds: ['世界你好', 'world hello'],
		})
	})
})

describe('change delimiter', () => {
	test('use \\s', () => {
		const str = 'hello world'
		const diff = sl(str, /\s/)
		expect(diff('hello')).toEqual({
			adds: [],
			subs: ['world'],
		})
	})
})
