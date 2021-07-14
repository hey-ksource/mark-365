import App from 'src/app/index.svelte';
import storage from 'src/storage';
import 'src/styles/common.css';

storage.init();
export default new App({
  target: document.body.querySelector('#app')
});
