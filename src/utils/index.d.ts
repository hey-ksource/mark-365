type fn = (arg?: any) => void;

declare module 'src/utils/default-value.ts' {
  const noop: fn;
  export { noop };
}
