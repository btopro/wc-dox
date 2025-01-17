import { DoxConfig } from './types';
import { markdownToHtml } from '../utils/markdown.js';

export const defaultDoxConfig: DoxConfig = {
  hideOnEmpty: true,
  headingLevel: 3,
  dox: {
    apiOrder: [
      'imports',
      'props',
      'slots',
      'methods',
      'events',
      'css-props',
      'css-parts',
      'css-states',
    ],
  },
  imports: {
    heading: 'Imports',
    headingId: 'imports',
    description: 'You can import the component in the following ways:',
    copyIcon:
      '<?xml version="1.0" ?><svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="st0" id="grid_system"/><g id="_icons"><path d="M17,3h-6C8.8,3,7,4.8,7,7c-2.2,0-4,1.8-4,4v6c0,2.2,1.8,4,4,4h6c2.2,0,4-1.8,4-4c2.2,0,4-1.8,4-4V7C21,4.8,19.2,3,17,3z    M15,17c0,1.1-0.9,2-2,2H7c-1.1,0-2-0.9-2-2v-6c0-1.1,0.9-2,2-2h1h5c1.1,0,2,0.9,2,2v5V17z M19,13c0,1.1-0.9,2-2,2v-4   c0-2.2-1.8-4-4-4H9c0-1.1,0.9-2,2-2h6c1.1,0,2,0.9,2,2V13z"/></g></svg>',
    copyLabel: 'Copy import',
    copiedIcon:
      '<?xml version="1.0" ?><svg style="enable-background:new 0 0 36 36;" version="1.1" viewBox="0 0 36 36" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"/><g id="icons"><path class="st0" d="M12.8,28.7l-9.5-9.5c-0.4-0.4-0.4-1.1,0-1.6l1.5-1.5c0.4-0.4,1.1-0.4,1.6,0l7.2,7.2   l16-16c0.4-0.4,1.1-0.4,1.6,0l1.5,1.5c0.4,0.4,0.4,1.1,0,1.6L14.4,28.7C13.9,29.1,13.2,29.1,12.8,28.7z" id="check_x5F_mark_1_"/></g></svg>',
    copiedLabel: 'Import copied',
    imports: [],
  },
  cssParts: {
    heading: 'CSS Parts',
    headingId: 'css-parts',
    skipLinkLabel: 'Skip to CSS parts',
    description:
      'The following [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) are available to customize the component:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: cssPart =>
      `<tr>
        <td><p><code>${cssPart.name}</code></p></td>
        <td>${markdownToHtml(cssPart.description || '')}</td>
        <td style="text-align: center;">${cssPart.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  cssProps: {
    heading: 'CSS Custom Properties',
    headingId: 'css-props',
    skipLinkLabel: 'Skip to CSS custom properties',
    description:
      'You can use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to customize the look and feel of the component using the following properties:',
    headings: ['Name', 'Default', 'Description', 'Deprecated'],
    rowTemplate: cssVar =>
      `<tr>
        <td><p><code>${cssVar.name}</code></p></td>
        <td><p><code>${cssVar.default}</code></p></td>
        <td>${markdownToHtml(cssVar.description || '')}</td>
        <td style="text-align: center;">${cssVar.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  events: {
    heading: 'Events',
    headingId: 'events',
    skipLinkLabel: 'Skip to events',
    description:
      'The following [events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) are emitted by the component:',
    headings: ['Name', 'Type', 'Description', 'Deprecated'],
    rowTemplate: event =>
      `<tr>
        <td><p><code>${event.name}</code></p></td>
        <td><p><code>${event.type.text === 'CustomEvent' ? 'CustomEvent' : `CustomEvent&lt;${event.type.text}&gt;`}</code></p></td>
        <td>${markdownToHtml(event.description || '')}</td>
        <td style="text-align: center;">${event.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  methods: {
    heading: 'Methods',
    headingId: 'methods',
    skipLinkLabel: 'Skip to methods',
    description: 'The following Methods are available:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: method =>
      `<tr>
        <td><p><code>${method.name}(${method.parameters?.map(p => `${p.name + (p.type?.text ? `: ${p.type?.text}` : '')}`).join(', ') || ''}) => ${method.return?.type?.text || 'void'}</code></p></td>
        <td>${markdownToHtml(method.description || '')}</td>
        <td style="text-align: center;">${method.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  props: {
    heading: 'Attributes and Properties',
    headingId: 'props',
    skipLinkLabel: 'Skip to attributes and properties',
    description: 'The following Properties and Attributes are available:',
    headings: [
      'Name',
      'Attribute',
      'Description',
      'Type',
      'Default',
      'Read-only',
      'Deprecated',
    ],
    rowTemplate: prop =>
      `<tr>
        <td><p><code>${prop.name}</code></p></td>
        <td><p><code>${prop.attribute || ''}</code></p></td>
        <td>${markdownToHtml(prop.description || '')}</td>
        <td><p><code>${prop.type?.text || ''}</code></p></td>
        <td><p><code>${prop.default}</code></p></td>
        <td style="text-align: center;">${prop.readonly ? '✔️' : ''}</td>
        <td style="text-align: center;">${prop.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  slots: {
    heading: 'Slots',
    headingId: 'slots',
    skipLinkLabel: 'Skip to slots',
    description: 'The following slots are available:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: slot =>
      `<tr>
        <td><p><code>${slot.name || '<em>(default)</em>'}</code></p></td>
        <td>${markdownToHtml(slot.description || '')}</td>
        <td style="text-align: center;">${slot.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
  cssStates: {
    heading: 'CSS States',
    headingId: 'css-states',
    skipLinkLabel: 'Skip to CSS states',
    description:
      'The following [CSS states](https://developer.mozilla.org/en-US/docs/Web/CSS/:state) can be used to customize component styles:',
    headings: ['Name', 'Description', 'Deprecated'],
    rowTemplate: state =>
      `<tr>
        <td><p><code>${state.name}</code></p></td>
        <td>${markdownToHtml(state.description || '')}</td>
        <td style="text-align: center;">${state.deprecated ? '✔️' : ''}</td>
      </tr>`,
  },
};
