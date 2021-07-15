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
  const Label: SvelteComponent;
  const Segment: SvelteComponent;
  const Content: SvelteComponent;
  const Actions: SvelteComponent;
  const InitialFocus: any;

  export { Label, Segment, Content, Actions, InitialFocus };
  export default SvelteComponent;
}
