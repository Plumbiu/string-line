export default sl

declare function sl(
	proxy: string,
	delimiter?: RegExp,
): (diffStr: string) => {
	subs: string[]
	adds: string[]
}
