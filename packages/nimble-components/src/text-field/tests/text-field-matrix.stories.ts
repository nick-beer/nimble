import type { Story, Meta } from '@storybook/html';
import { withXD } from 'storybook-addon-xd-designs';
import {
    matrixThemeWrapper,
    disabledStates,
    DisabledState,
    InvalidState,
    invalidStates,
    ReadOnlyState,
    readOnlyStates
} from '../../tests/utilities/theme-test-helpers';
import '../index';

interface TextFieldArgs {
    label: string;
    type: string;
    value: string;
}

const metadata: Meta<TextFieldArgs> = {
    title: 'Tests/Text Field',
    decorators: [withXD],
    parameters: {
        design: {
            artboardUrl:
                'https://xd.adobe.com/view/8ce280ab-1559-4961-945c-182955c7780b-d9b1/screen/842889a5-67ba-4350-91c1-55eee48f4fa2/specs/'
        }
    }
};

export default metadata;

const valueStates = [
    ['Placeholder', 'placeholder="placeholder"'],
    ['Value', 'value="Hello"']
];
type ValueState = typeof valueStates[number];

const typeStates = [
    ['Text', 'type="text"'],
    ['Password', 'type="password"']
];
type TypeState = typeof typeStates[number];

const component = (
    [readOnlyName, readonly]: ReadOnlyState,
    [disabledName, disabled]: DisabledState,
    [invalidName, invalid]: InvalidState,
    [typeName, type]: TypeState,
    [valueName, value]: ValueState
): string => `
    <nimble-text-field style="width: 250px; padding: 15px;" ${disabled} ${invalid} ${type} ${value} ${readonly}>
        ${disabledName} ${invalidName} ${typeName} ${valueName} ${readOnlyName}
    </nimble-text-field>`;

export const textFieldThemeMatrix: Story = (): string => matrixThemeWrapper(component, [
    readOnlyStates,
    disabledStates,
    invalidStates,
    typeStates,
    valueStates
]);
