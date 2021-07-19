<script lang="ts">
  import Tooltip, { Wrapper, Content } from '@smui/tooltip';
  import Lrc from 'src/components/lrc';
  import GithubIcon from 'src/components/icon/github';
  import BatteryIcon from 'src/components/icon/battery';
  import qrCode from 'assets/charge-qrcode.png';

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
    <GithubIcon href="https://github.com/hey-ksource/mark" target="_blank" />
    <Wrapper rich>
      <div role="button"><BatteryIcon /></div>
      <Tooltip persistent>
        <Content>
          <div class="charge-tips">若能助你养成习惯</div>
          <div class="charge-tips">不妨给我充个电</div>
          <img src={qrCode} alt="qrcode" />
        </Content>
      </Tooltip>
    </Wrapper>
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
  .charge-tips {
    color: rgb(var(--text-primary));
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  @media (max-width: 400px) {
    .logo {
      font-size: 32px;
    }
  }
</style>
