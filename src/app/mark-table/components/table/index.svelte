<script lang="ts">
  export let rowList: Array<IMark[]> = [[]];
  export let onClickCell: (cell: IMark) => void;
</script>

<slot>
  <div class="mark-table">
    {#each rowList as row, r}
      <div class="row">
        {#each row as cell, c}
          <div class="cell">
            {#if cell}
              <div
                class="cell-content {cell.isMarked
                  ? 'is-marked'
                  : 'isnt-marked'}"
                on:click={() => onClickCell(cell)}
              >
                {cell.money}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</slot>

<style>
  .mark-table {
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(var(--border-color));
    user-select: none;
    height: 100%;
  }
  .row {
    display: flex;
    flex: 1;
  }
  .row + .row {
    border-top: 1px solid rgb(var(--border-color));
  }
  .cell {
    flex: 1;
  }
  .cell + .cell {
    border-left: 1px solid rgb(var(--border-color));
  }
  .cell-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #fff;
    font-size: 12px;
    transition: all 0.2s;
  }

  .cell-content.is-marked {
    background: rgb(var(--primary-color));
    font-weight: 500;
  }
  .cell-content.isnt-marked {
    color: rgb(var(--text-minor));
  }
  .cell-content.isnt-marked:hover {
    background: rgb(var(--primary-color), 0.33);
    color: rgb(var(--text-primary));
    cursor: pointer;
    font-weight: 500;
  }
</style>
