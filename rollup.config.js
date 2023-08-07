import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'es',
	},
	plugins: [
		nodeResolve({
			preferBuiltins: true,
			exportConditions: ['node'],
		}),
		typescript(),
		terser(),
	],
}
