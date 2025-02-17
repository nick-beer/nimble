import type { WaferMap } from '..';
import type { DataManager } from '../modules/data-manager';
import { Prerendering } from '../modules/prerendering';
import { WaferMapColorScaleMode } from '../types';
import {
    getDataManagerMock,
    defaultHorizontalScale,
    defaultVerticalScale,
    getWaferMapDies,
    getWaferMapMockPrerendering
} from './utilities';

describe('Wafermap Prerendering module', () => {
    let prerenderingModule: Prerendering;
    const emptyDieColor = 'rgba(218,223,236,1)';
    const nanDieColor = 'rgba(122,122,122,1)';

    describe('with linear color scale', () => {
        const colorScaleMode = WaferMapColorScaleMode.linear;

        describe('and only one color value pair', () => {
            const dieDimensions = { width: 10, height: 10 };
            const dieLabelsSuffix = '';
            const dieLabelsHidden = true;
            const maxCharacters = 2;
            const highlightedTags: string[] = [];
            const margin = { top: 0, right: 0, bottom: 0, left: 0 };

            beforeEach(() => {
                const waferMock = getWaferMapMockPrerendering(
                    getWaferMapDies(),
                    { colors: ['red'], values: ['1'] },
                    highlightedTags,
                    colorScaleMode,
                    dieLabelsHidden,
                    dieLabelsSuffix,
                    maxCharacters
                );
                const dataManagerMock = getDataManagerMock(
                    dieDimensions,
                    margin,
                    defaultHorizontalScale,
                    defaultVerticalScale
                );
                prerenderingModule = new Prerendering(
                    waferMock as WaferMap,
                    dataManagerMock as DataManager
                );
                prerenderingModule.updateLabelsFontSize();
            });

            it('should have black fill style for all dies', () => {
                for (const dieRenderInfo of prerenderingModule.diesRenderInfo) {
                    expect(dieRenderInfo.fillStyle).toEqual(emptyDieColor);
                }
            });
        });

        describe('and only one duplicated color value pair', () => {
            const dieDimensions = { width: 10, height: 10 };
            const dieLabelsSuffix = '';
            const dieLabelsHidden = true;
            const maxCharacters = 2;
            const highlightedTags: string[] = [];
            const margin = { top: 0, right: 0, bottom: 0, left: 0 };

            beforeEach(() => {
                const waferMock = getWaferMapMockPrerendering(
                    getWaferMapDies(),
                    {
                        colors: ['red', 'red'],
                        values: ['1', '1']
                    },
                    highlightedTags,
                    colorScaleMode,
                    dieLabelsHidden,
                    dieLabelsSuffix,
                    maxCharacters
                );
                const dataManagerMock = getDataManagerMock(
                    dieDimensions,
                    margin,
                    defaultHorizontalScale,
                    defaultVerticalScale
                );
                prerenderingModule = new Prerendering(
                    waferMock as WaferMap,
                    dataManagerMock as DataManager
                );
                prerenderingModule.updateLabelsFontSize();
            });

            it('should have the same fill style for all dies', () => {
                for (const dieRenderInfo of prerenderingModule.diesRenderInfo) {
                    expect(dieRenderInfo.fillStyle).toEqual('rgba(255,0,0,1)');
                }
            });
        });

        describe('and color value pairs for the scale ends', () => {
            const dieDimensions = { width: 10, height: 10 };
            const dieLabelsSuffix = '';
            const dieLabelsHidden = true;
            const maxCharacters = 2;
            const highlightedTags: string[] = [];
            const margin = { top: 0, right: 0, bottom: 0, left: 0 };

            beforeEach(() => {
                const waferMock = getWaferMapMockPrerendering(
                    getWaferMapDies(),
                    {
                        colors: ['black', 'red'],
                        values: ['1', '18']
                    },
                    highlightedTags,
                    colorScaleMode,
                    dieLabelsHidden,
                    dieLabelsSuffix,
                    maxCharacters
                );
                const dataManagerMock = getDataManagerMock(
                    dieDimensions,
                    margin,
                    defaultHorizontalScale,
                    defaultVerticalScale
                );
                prerenderingModule = new Prerendering(
                    waferMock as WaferMap,
                    dataManagerMock as DataManager
                );
                prerenderingModule.updateLabelsFontSize();
            });

            it('should have the fill style equally distributed to dies', () => {
                const waferMapDies = getWaferMapDies();
                const expectedValues = waferMapDies.map(waferMapDie => {
                    return {
                        fillStyle: `rgba(${
                            (+waferMapDie.value - 1) * 15
                        },0,0,1)`
                    };
                });
                for (let i = 0; i < waferMapDies.length; i += 1) {
                    expect(
                        prerenderingModule.diesRenderInfo[i]!.fillStyle
                    ).toEqual(expectedValues[i]!.fillStyle);
                }
            });
        });
    });

    describe('with ordinal color scale', () => {
        const colorScaleMode = WaferMapColorScaleMode.ordinal;

        describe('and only one color value pair', () => {
            const dieDimensions = { width: 10, height: 10 };
            const dieLabelsSuffix = '';
            const dieLabelsHidden = true;
            const maxCharacters = 2;
            const highlightedTags: string[] = [];
            const margin = { top: 0, right: 0, bottom: 0, left: 0 };

            beforeEach(() => {
                const waferMock = getWaferMapMockPrerendering(
                    getWaferMapDies(),
                    { colors: ['red'], values: ['1'] },
                    highlightedTags,
                    colorScaleMode,
                    dieLabelsHidden,
                    dieLabelsSuffix,
                    maxCharacters
                );
                const dataManagerMock = getDataManagerMock(
                    dieDimensions,
                    margin,
                    defaultHorizontalScale,
                    defaultVerticalScale
                );
                prerenderingModule = new Prerendering(
                    waferMock as WaferMap,
                    dataManagerMock as DataManager
                );
                prerenderingModule.updateLabelsFontSize();
            });

            it('should have the same fill style for all dies', () => {
                for (const dieRenderInfo of prerenderingModule.diesRenderInfo) {
                    expect(dieRenderInfo.fillStyle).toEqual('rgba(255,0,0,1)');
                }
            });
        });

        describe('and two colors', () => {
            const dieDimensions = { width: 10, height: 10 };
            const dieLabelsSuffix = '';
            const dieLabelsHidden = true;
            const maxCharacters = 2;
            const highlightedTags: string[] = [];
            const margin = { top: 0, right: 0, bottom: 0, left: 0 };

            beforeEach(() => {
                const waferMock = getWaferMapMockPrerendering(
                    getWaferMapDies(),
                    {
                        colors: ['black', 'red'],
                        values: []
                    },
                    highlightedTags,
                    colorScaleMode,
                    dieLabelsHidden,
                    dieLabelsSuffix,
                    maxCharacters
                );
                const dataManagerMock = getDataManagerMock(
                    dieDimensions,
                    margin,
                    defaultHorizontalScale,
                    defaultVerticalScale
                );
                prerenderingModule = new Prerendering(
                    waferMock as WaferMap,
                    dataManagerMock as DataManager
                );
                prerenderingModule.updateLabelsFontSize();
            });

            it('should have alternating fill style for the dies', () => {
                const waferMapDies = getWaferMapDies();
                const expectedValues = waferMapDies.map(waferMapDie => {
                    const fillStyle = +waferMapDie.value % 2 === 1
                        ? 'rgba(0,0,0,1)'
                        : 'rgba(255,0,0,1)';
                    return {
                        fillStyle
                    };
                });
                for (let i = 0; i < waferMapDies.length; i += 1) {
                    expect(
                        prerenderingModule.diesRenderInfo[i]!.fillStyle
                    ).toEqual(expectedValues[i]!.fillStyle);
                }
            });
        });
    });

    describe('with non numeric values', () => {
        const dieDimensions = { width: 10, height: 10 };
        const dieLabelsSuffix = '';
        const dieLabelsHidden = true;
        const maxCharacters = 2;
        const highlightedTags: string[] = [];
        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        beforeEach(() => {
            const waferMock = getWaferMapMockPrerendering(
                [
                    {
                        x: 0,
                        y: 0,
                        value: 'NaN'
                    }
                ],
                { colors: [], values: [] },
                highlightedTags,
                WaferMapColorScaleMode.linear,
                dieLabelsHidden,
                dieLabelsSuffix,
                maxCharacters
            );
            const dataManagerMock = getDataManagerMock(
                dieDimensions,
                margin,
                defaultHorizontalScale,
                defaultVerticalScale
            );
            prerenderingModule = new Prerendering(
                waferMock as WaferMap,
                dataManagerMock as DataManager
            );
            prerenderingModule.updateLabelsFontSize();
        });

        it('should have NaN color fill style', () => {
            for (const dieRenderInfo of prerenderingModule.diesRenderInfo) {
                expect(dieRenderInfo.fillStyle).toEqual(nanDieColor);
            }
        });
    });

    describe('with undefined values', () => {
        const dieDimensions = { width: 10, height: 10 };
        const dieLabelsSuffix = '';
        const dieLabelsHidden = true;
        const maxCharacters = 2;
        const highlightedTags: string[] = [];
        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        beforeEach(() => {
            const waferMock = getWaferMapMockPrerendering(
                [
                    {
                        x: 0,
                        y: 0,
                        value: undefined as unknown as string
                    }
                ],
                { colors: [], values: [] },
                highlightedTags,
                WaferMapColorScaleMode.linear,
                dieLabelsHidden,
                dieLabelsSuffix,
                maxCharacters
            );
            const dataManagerMock = getDataManagerMock(
                dieDimensions,
                margin,
                defaultHorizontalScale,
                defaultVerticalScale
            );
            prerenderingModule = new Prerendering(
                waferMock as WaferMap,
                dataManagerMock as DataManager
            );
            prerenderingModule.updateLabelsFontSize();
        });

        it('should have empty color fill style', () => {
            for (const dieRenderInfo of prerenderingModule.diesRenderInfo) {
                expect(dieRenderInfo.fillStyle).toEqual(emptyDieColor);
            }
        });
    });

    describe('with a highlighted value', () => {
        const dieDimensions = { width: 10, height: 10 };
        const dieLabelsSuffix = '';
        const dieLabelsHidden = true;
        const maxCharacters = 2;
        const highlightedTag = '5';
        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        beforeEach(() => {
            const waferMock = getWaferMapMockPrerendering(
                getWaferMapDies(),
                { colors: ['red'], values: [] },
                [highlightedTag],
                WaferMapColorScaleMode.ordinal,
                dieLabelsHidden,
                dieLabelsSuffix,
                maxCharacters
            );
            const dataManagerMock = getDataManagerMock(
                dieDimensions,
                margin,
                defaultHorizontalScale,
                defaultVerticalScale
            );
            prerenderingModule = new Prerendering(
                waferMock as WaferMap,
                dataManagerMock as DataManager
            );
            prerenderingModule.updateLabelsFontSize();
        });

        it('should have highlighted value with full opacity and the rest with expected opacity', () => {
            const waferMapDies = getWaferMapDies();
            const expectedValues = waferMapDies.map(waferMapDie => {
                if (!waferMapDie.tags) {
                    return {
                        fillStyle: 'rgba(255,0,0,0.3)'
                    };
                }
                const opacity = waferMapDie.tags[0] === highlightedTag ? 1 : 0.3;
                return {
                    fillStyle: `rgba(255,0,0,${opacity})`
                };
            });
            for (let i = 0; i < waferMapDies.length; i += 1) {
                expect(prerenderingModule.diesRenderInfo[i]!.fillStyle).toEqual(
                    expectedValues[i]!.fillStyle
                );
            }
        });
    });

    describe('without highlighted values', () => {
        const dieDimensions = { width: 10, height: 10 };
        const dieLabelsSuffix = '';
        const dieLabelsHidden = true;
        const maxCharacters = 2;
        const highlightedTags: string[] = [];
        const margin = { top: 0, right: 0, bottom: 0, left: 0 };

        beforeEach(() => {
            const waferMock = getWaferMapMockPrerendering(
                getWaferMapDies(),
                { colors: ['red'], values: [] },
                highlightedTags,
                WaferMapColorScaleMode.ordinal,
                dieLabelsHidden,
                dieLabelsSuffix,
                maxCharacters
            );
            const dataManagerMock = getDataManagerMock(
                dieDimensions,
                margin,
                defaultHorizontalScale,
                defaultVerticalScale
            );
            prerenderingModule = new Prerendering(
                waferMock as WaferMap,
                dataManagerMock as DataManager
            );
            prerenderingModule.updateLabelsFontSize();
        });

        it('should have all dies with full opacity', () => {
            for (const dieRenderInfo of prerenderingModule.diesRenderInfo) {
                expect(dieRenderInfo.fillStyle).toEqual('rgba(255,0,0,1)');
            }
        });
    });
});
