import styles from './slots.styles.js';
import { config, CssPropsElementConfig } from '../../configs/index.js';
import * as cem from 'custom-elements-manifest/schema';
import WcDoxBase from '../base/dox-base.js';


/**
 * A component to document the slots of a custom element
 *
 * @tag wc-slots
 * @since 1.0.0
 * @status experimental
 *
 **/
export class WcSlots extends WcDoxBase<
  CssPropsElementConfig,
  cem.CssCustomProperty
> {
  public constructor() {
    super();
    this.config = config.slots;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateMetaData('slots');
  }

  override render() {
    return this.getRenderTemplate(styles, 'slots');
  }
}

export default WcSlots;
