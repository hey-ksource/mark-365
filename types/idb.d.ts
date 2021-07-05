declare type IPerson = {
  id: number;
  name: string;
  age: number;
  email: string;
};

declare module 'src/storage' {
  const add: (person: IPerson) => IDBRequest;
  export { add };
}
