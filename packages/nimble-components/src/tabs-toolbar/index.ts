import { DesignSystem, FoundationElement } from '@microsoft/fast-foundation';
import { styles } from './styles';
import { template } from './template';

/**
 * A nimble-styled container for toolbar content next to tabs.
 */
export class TabsToolbar extends FoundationElement {}

const nimbleTabsToolbar = TabsToolbar.compose({
    baseName: 'tabs-toolbar',
    template,
    styles
});

DesignSystem.getOrCreate().withPrefix('nimble').register(nimbleTabsToolbar());
