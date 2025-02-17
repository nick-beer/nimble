# Creating Storybook Component Documentation

## Getting Started

From the `nimble` directory:

1. Run `npm install`
2. Run `npm run build`
3. To view the component documentation in Storybook: `npm run storybook -w @ni/nimble-components`

## Documentation Workflow
Add a `docs.description.component` string to the component `parameters` object. E.g.

```ts
const metadata: Meta<ComponentArgs> = {
    title: 'SomeComponent',
    parameters: {
        docs: {
            description: {
                component: '**Some component description**'
            }
        },
        ...
```

If the component has a [W3C ARIA description](https://www.w3.org/WAI/ARIA/apg/patterns/), consider using that to describe the component purpose.

### Markdown

The description supports Markdown, so can link to other documents or components. E.g.

```md
[Links to a specific documentation page](?path=/docs/some--id)
[Links to a specific story canvas](?path=/story/some--id)
```

Note: if linking in a story via a native or Nimble anchor component, use the following syntax:

```html
<a href="./?path=/docs/some--id" target="_top">Link</a>
```

All other Markdown formatting is supported. See any [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/) for more information.

### Testing 

When you run Storybook (See **Getting Started** above), you should see the component description within the **Docs** tab. E.g. 

![Storybook DocsPage overview](/packages/nimble-components/docs/images/docs-page-overview.png)

