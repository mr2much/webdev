const bar = () => console.log('bar');

const baz = () =>console.log('bar');

const foo = () => {
  console.log('foo');
  bar();
  baz();
}

foo();