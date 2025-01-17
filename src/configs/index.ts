import { mergeDeep } from '../utils/deep-merge.js';
import { defaultDoxConfig } from './default-values.js';
import { DoxConfig } from './types.js';
import * as cem from 'custom-elements-manifest/schema';

export * from './types.js';

export let config: DoxConfig = { ...defaultDoxConfig };
export let manifest = {} as cem.cem;

export function setWcDoxConfig(
  customElementsManifest: unknown,
  userConfig: DoxConfig = {},
) {
  config = mergeDeep(config as never, userConfig as never);
  manifest = customElementsManifest as never;
}
