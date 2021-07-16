<script lang="ts">
  import IconButton, { Icon } from '@smui/icon-button';

  import { mdiGithub } from '@mdi/js';
  import Svg from '@smui/common/Svg.svelte';
  import Lrc from 'src/components/lrc/index.svelte';

  let color: string;
  const setColor = (value: string) => {
    color = value;
  };
</script>

<div class="footer-container" style="color: {color}">
  <div class="footer-item">
    <div class="logo">Mark 365</div>
  </div>

  <div class="footer-item">
    <Lrc {setColor} />
  </div>

  <div class="footer-item">
    <IconButton
      class="github-icon-button"
      href="https://github.com/hey-ksource/mark"
      target="_blank"
    >
      <Icon
        component={Svg}
        viewBox="0 0 24 24"
        class="material-icons github-icon"
      >
        <path fill="currentColor" d={mdiGithub} />
      </Icon>
    </IconButton>
  </div>

  <div class="footer-item">
    <span class="email">ksource@aliyun.com</span>
    <span class="copyright">KSource</span>
  </div>
</div>

<style>
  .footer-container {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid rgb(var(--border-color));
    color: rgb(var(--text-minor));
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: color 2s;
  }
  .footer-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  * :global(.footer-item .github-icon-button) {
    margin-right: 10px;
    padding: 0;
    width: auto;
    height: auto;
    line-height: 0;
  }
  * :global(.github-icon) {
    width: 24px;
    height: 24px;
  }
  .logo {
    font-size: 40px;
    font-weight: bold;
    line-height: 1;
  }
  .email {
    user-select: all;
    color: rgb(var(--text-minor));
  }
  .copyright {
    margin-left: 15px;
    color: rgb(var(--text-assist));
  }
  .copyright::before {
    content: '©';
    margin-right: 5px;
  }

  @media (max-width: 400px) {
    .logo {
      font-size: 32px;
    }
  }
</style>
