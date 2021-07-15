<script lang="ts">
  import Button, { Label } from '@smui/button';
  import Lrc from 'src/components/lrc/index.svelte';
</script>

<div class="footer-container">
  <div class="logo">Mark 365</div>
  <Button href="https://github.com/hey-ksource/mark" target="_blank">
    <Label>Github</Label>
  </Button>
  <div class="email">ksource@aliyun.com</div>
  <Lrc />
  <div class="copyright">KSource</div>
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
  }
  .footer-container > div {
    user-select: all;
    margin: 10px 0;
  }
  .logo {
    font-size: 40px;
    font-weight: bold;
    line-height: 1;
    color: rgba(var(--primary-color), 0.66);
  }
  .copyright {
    color: rgb(var(--text-assist));
  }
  .copyright::before {
    content: '©';
    margin-right: 5px;
  }
</style>
