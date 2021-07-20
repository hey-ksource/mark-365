<script lang="ts">
  import dayjs from 'dayjs';

  export let value: string = null;
  export let onChange = (value: string) => {};

  const maxDate = dayjs().format('YYYY-MM-DD');
  const minDate = dayjs().subtract(365, 'day').format('YYYY-MM-DD');
  const _onChange = (event: Event) => {
    // @ts-ignore
    onChange(event.target.value);
  };
</script>

<div class="date-picker">
  <input
    type="date"
    bind:value
    on:change={_onChange}
    min={minDate}
    max={maxDate}
  />
</div>

<style>
  .date-picker input {
    width: 100%;
    border: 1px solid rgb(var(--border-color));
    color: rgb(var(--text-primary));
  }
</style>
