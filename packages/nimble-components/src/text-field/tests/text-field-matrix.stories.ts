import type { Story, Meta } from '@storybook/html';
import { withXD } from 'storybook-addon-xd-designs';
import { html, ViewTemplate } from '@microsoft/fast-element';
import { createRenderer } from '../../utilities/tests/storybook';
import {
    createMatrix,
    themeWrapper,
    disabledStates,
    DisabledState,
    InvalidState,
    invalidStates,
    ReadOnlyState,
    readOnlyStates
} from '../../utilities/tests/matrix';
import '../index';
import { hiddenWrapper } from '../../utilities/tests/hidden';

const metadata: Meta = {
    title: 'Tests/Text Field',
    decorators: [withXD],
    parameters: {
        design: {
            artboardUrl:
                'https://xd.adobe.com/view/8ce280ab-1559-4961-945c-182955c7780b-d9b1/screen/842889a5-67ba-4350-91c1-55eee48f4fa2/specs/'
        },
        controls: { hideNoControlsWarning: true }
    }
};

export default metadata;

const valueStates = [
    ['Placeholder', null, 'placeholder'],
    ['Value', 'Hello', null]
];
type ValueState = typeof valueStates[number];

const typeStates = [
    ['Text', 'text'],
    ['Password', 'password']
];
type TypeState = typeof typeStates[number];

const component = (
    [readOnlyName, readonly]: ReadOnlyState,
    [disabledName, disabled]: DisabledState,
    [invalidName, invalid]: InvalidState,
    [typeName, type]: TypeState,
    [valueName, valueValue, placeholderValue]: ValueState
): ViewTemplate => html`
    <nimble-text-field
        style="width: 250px; padding: 15px;"
        class="${() => invalid}"
        ?disabled="${() => disabled}"
        type="${() => type}"
        value="${() => valueValue}"
        placeholder="${() => placeholderValue}"
        ?readonly="${() => readonly}"
    >
        ${() => disabledName} ${() => invalidName} ${() => typeName}
        ${() => valueName} ${() => readOnlyName}
    </nimble-text-field>
`;

export const textFieldThemeMatrix: Story = createRenderer(
    themeWrapper(
        createMatrix(component, [
            readOnlyStates,
            disabledStates,
            invalidStates,
            typeStates,
            valueStates
        ])
    )
);

export const hiddenTextField = createRenderer(
    hiddenWrapper(
        html`<nimble-text-field hidden>Hidden text field</nimble-text-field>`
    )
);
