import { css } from 'lit';

export default css`
  :root {
    --wc-imports-border-color: var(--wc-dox-border-color, #e0e0e0);
    --wc-imports-active-border-color: var(
      --wc-dox-active-border-color,
      #0078d4
    );
    --wc-imports-border-size: var(--wc-dox-border-size, 2px);
  }

  wc-imports {
    &[hidden] {
      display: none !important;
    }

    .tabpanel {
      position: relative;

      code {
        display: block;
      }

      pre {
        overflow-x: auto;
        overflow-y: hidden;
        display: block;
      }

      .copy-button {
        padding: 0.25rem;
        line-height: 1;
        display: inline-flex;
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;

        svg {
          fill: currentColor;
          width: 1em;
          height: 1em;
        }
      }
    }

    .tablist {
      display: flex;
      border-bottom: var(--wc-imports-border-size) solid
        var(--wc-imports-border-color);
    }

    .tab {
      padding: 8px 16px;
      cursor: pointer;
      border: transparent;
      border-bottom: 1px solid transparent;
      background-color: transparent;
      margin-bottom: calc(-1 * var(--wc-imports-border-size));

      &[aria-selected='true'] {
        border-bottom: var(--wc-imports-border-size) solid
          var(--wc-imports-active-border-color);
      }
    }
  }
`;
