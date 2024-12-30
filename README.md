# Web Component Documentation (`wc-dox`)

The `wc-dox` package and it's components are designed to be a way to quickly and consistently document your custom element APIs using the [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest).

> If you're not already generating a Custom Elements Manifest, [here is a list of options](https://dev.to/stuffbreaker/you-should-be-shipping-a-manifest-with-your-web-components-2da0) you can use to generate one.

## Installation

```bash
npm i wc-dox
```

## Usage

After installing, you can load the documentation at the root of your project.

```ts
import { setWcDoxConfig } from 'wc-dox/index.js';
import manifest from './custom-elements.json' with { type: json };

setWcDoxConfig(manifest);
```

Now that it's loaded, you can load the appropriate documentation by passing the component's tag name or class name to the component.

```html
<wc-dox tag="my-element"></wc-dox>

<!-- or -->

<wc-dox component-name="MyElement"></wc-dox>
```

Each of the sections can also be used independently as individual components.

```html
<!-- CSS Parts docs -->
<wc-css-parts tag="my-element"></wc-css-parts>

<!-- CSS Custom Properties docs -->
<wc-props tag="my-element"></wc-props>

<!-- Events docs -->
<wc-events tag="my-element"></wc-events>

<!-- Imports docs -->
<wc-imports tag="my-element"></wc-imports>

<!-- Methods docs -->
<wc-methods tag="my-element"></wc-methods>

<!-- Attributes and Properties docs -->
<wc-props tag="my-element"></wc-props>

<!-- Slots docs -->
<wc-slots tag="my-element"></wc-slots>

<!-- CSS Custom States docs -->
<wc-css-states tag="my-element"></wc-css-states>
```

## Configuration

The `setWcDoxConfig` function can take a second parameter to configure the documentation.

The `<wc-dox>` and `<wc-imports>` components have unique configurations, but the others follow a consistent API.

```ts
import { setWcDoxConfig, DoxConfig } from 'wc-dox/index.js';
import manifest from './custom-elements.json' with { type: json };

const options: DoxConfig = {};

setWcDoxConfig(manifest, options);
```

```ts
type DoxConfig = {
  /** Configures the heading level for the API sections - default is 3 */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Configures the `wc-dox` component contents */
  dox?: DoxElementConfig;
  /** Configures the `wc-imports` component contents */
  imports?: ImportsElementConfig;
  /** Configures the `wc-css-parts` component contents */
  cssParts?: CssPartsElementConfig;
  /** Configures the `wc-css-props` component contents */
  cssProps?: CssPropsElementConfig;
  /** Configures the `wc-states` component contents */
  cssStates?: StatesElementConfig;
  /** Configures the `wc-events` component contents */
  events?: EventsElementConfig;
  /** Configures the `wc-methods` component contents */
  methods?: MethodsElementConfig;
  /** Configures the `wc-props` component contents */
  props?: PropsElementConfig;
  /** Configures the `wc-slots` component contents */
  slots?: SlotsElementConfig;
};
```

### headingLevel

This setting controls the heading level for the sections of the API sections.

### Dox Element Config

The `<wc-dox>` element works as a wrapper for the API components. The `apiOrder` setting controls the order in which the API sections are rendered. If you do not want a section to render at all, you can exclude it from the array.

```ts
type DoxElementConfig = {
  /**
   * Controls the order in which the API documentation sections are displayed
   *
   * Default value is ['imports', 'props', 'slots', 'methods', 'events', 'css-props', 'css-parts', 'css-states']
   */
  apiOrder?: Array<
    | 'imports'
    | 'props'
    | 'slots'
    | 'methods'
    | 'events'
    | 'css-props'
    | 'css-parts'
    | 'css-states'
  >;
};
```

### Imports Element Config

The imports element is a way for you to document the various ways to import your components. Each of the imports will be displayed in it's own tab.

```ts
type ImportsElementConfig = {
  /** The heading for the imports section */
  heading?: string;
  /** The ID used for the skip-link */
  headingId?: string;
  /** The description for the imports section */
  description?: string;
  /** The list of import options */
  imports?: ImportConfig[];
};

type ImportConfig = {
  /** The text displayed in the tab option */
  label?: string;
  /** The language the code - `html`, `js`, `ts`, etc. */
  lang?: string;
  /** An additional description that is specific to this import */
  description?: string;
  /**
   * Use this function to specify import information for a given language. The tag and class names can be used to create dynamic component-specific import paths.
   * @param tagName The tag name specified using the @tag or @tagName in the component's jsDoc
   * @param className The JS class name for the component
   * @returns string
   */
  importTemplate?: (tagName: string, className: string) => string;
};
```

Here's a sample configuration:

```ts
imports: {
  heading: 'Imports',
  headingId: 'imports',
  description: 'You can import the component in the following ways:',
  imports: [
    {
      label: 'HTML',
      lang: 'html',
      importTemplate: (tagName, className) =>
        `<script type="module" src="https://cdn.jsdelivr.net/npm/my-library/dist/${tagName}/${className}.js"></script>`,
    },
    {
      label: 'NPM',
      lang: 'js',
      importTemplate: (tagName, className) =>
        `import 'my-library/dist/${tagName}/${className}.js';`,
    },
    {
      label: 'React',
      lang: 'js',
      importTemplate: tagName =>
        `import 'my-library/react/${tagName}/index.js';`,
    },
  ],
},
```

### Base Config

The other API blocks use the generic `BaseElementConfig<T>` type and follow a consistent pattern for documenting the APIs from the custom element manifest.

```ts
type BaseElementConfig<T> = {
  /** The heading for the section */
  heading?: string;
  /** The ID used for the skip-link */
  headingId?: string;
  /** The description for the section */
  headings?: string[];
  /** The description for the section */
  description?: string;
  /** The table row template for the section */
  rowTemplate?: (x: T) => string;
};
```

### CSS Parts Element Config

```ts
type CssPart = cem.CssPart & Record<string, any>;
type CssPartsElementConfig = BaseElementConfig<CssPart>;
```

The default value for this is:

```ts
cssParts: {
  heading: 'CSS Parts',
  headingId: 'css-parts',
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
```

### CSS Props Element Config

```ts
type CssPropsElementConfig = BaseElementConfig<CssProp>;
type CssProp = cem.CssCustomProperty & Record<string, any>;
```

The default value for the CSS Custom Properties Element is:

```ts
cssProps: {
  heading: 'CSS Custom Properties',
  headingId: 'css-props',
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
```

### Events Element Config

```ts
type EventsElementConfig = BaseElementConfig<Event>;
type Event = cem.Event & Record<string, any>;
```

The default value for the Events Element is:

```ts
events: {
  heading: 'Events',
  headingId: 'events',
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
```

### Methods Element Config

```ts
type MethodsElementConfig = BaseElementConfig<Method>;
type Method = cem.ClassMethod & Record<string, any>;
```

The default value for the Methods Element is:

```ts
methods: {
  heading: 'Methods',
  headingId: 'methods',
  description: 'The following CSS parts are available:',
  headings: ['Name', 'Description', 'Type', 'Deprecated'],
  rowTemplate: method =>
    `<tr>
      <td><p><code>${method.name}</code></p></td>
      <td>${markdownToHtml(method.description || '')}</td>
      <td><p><code>(${method.parameters?.map(p => `${p.name + (p.type?.text ? `: ${p.type?.text}` : '')}`).join(', ') || ''}) => ${method.return?.type?.text || 'void'}</code></p></td>
      <td style="text-align: center;">${method.deprecated ? '✔️' : ''}</td>
    </tr>`,
},
```

### Props Element Config

```ts
type PropsElementConfig = BaseElementConfig<Property>;
type Method = cem.ClassMethod & Record<string, any>;
```

The default value for the Props Element is:

```ts
props: {
  heading: 'Attributes and Properties',
  headingId: 'props',
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
```

### Slots Element Config

```ts
type SlotsElementConfig = BaseElementConfig<Slot>;
type Slot = cem.Slot & Record<string, any>;
```

The default value for the Slots Element is:

```ts
slots: {
  heading: 'Slots',
  headingId: 'slots',
  description: 'The following slots are available:',
  headings: ['Name', 'Description', 'Deprecated'],
  rowTemplate: slot =>
    `<tr>
      <td><p><code>${slot.name || '<em>(default)</em>'}</code></p></td>
      <td>${markdownToHtml(slot.description || '')}</td>
      <td style="text-align: center;">${slot.deprecated ? '✔️' : ''}</td>
    </tr>`,
},
```

### CssStatesElementConfig

```ts
type CssStatesElementConfig = BaseElementConfig<CssState>;
type CssState = cem.CssCustomState & Record<string, any>;
```

The default value for the CSS States Element is:

```ts
cssStates: {
  heading: 'CSS States',
  headingId: 'css-states',
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
```