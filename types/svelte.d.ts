declare module '*.svelte' {
  export default SvelteComponent;
}
declare module 'src/app/*' {
  export default SvelteComponent;
}

declare module 'src/components/*' {
  export default SvelteComponent;
}

declare module '@smui/*' {
  const Label: any;
  const Segment: any;
  export { Label, Segment };
  export default SvelteComponent;
}
