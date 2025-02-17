import type { DataManager } from './modules/data-manager';

export const WaferMapOriginLocation = {
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
    topLeft: 'top-left',
    topRight: 'top-right'
} as const;

export type WaferMapOriginLocation =
    (typeof WaferMapOriginLocation)[keyof typeof WaferMapOriginLocation];

export const WaferMapOrientation = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
} as const;

export type WaferMapOrientation =
    (typeof WaferMapOrientation)[keyof typeof WaferMapOrientation];

export const HoverDieOpacity = {
    show: 'show',
    hide: 'hide'
} as const;

export type HoverDieOpacity =
    (typeof HoverDieOpacity)[keyof typeof HoverDieOpacity];

export const WaferMapColorScaleMode = {
    linear: 'linear',
    ordinal: 'ordinal'
} as const;

export type WaferMapColorScaleMode =
    (typeof WaferMapColorScaleMode)[keyof typeof WaferMapColorScaleMode];

export interface WaferMapDie {
    value: string;
    x: number;
    y: number;
    // The metadata field is not used by the wafer-map and is only for optionally storing arbitrary metadata.
    metadata?: unknown;
    tags?: string[];
}

export interface WaferMapColorScale {
    colors: string[];
    values: string[];
}

export interface HoverHandlerData {
    canvas: HTMLCanvasElement;
    rect: HTMLElement;
    dataManager: DataManager;
    originLocation: WaferMapOriginLocation;
}

export interface Dimensions {
    readonly width: number;
    readonly height: number;
}

export interface Margin {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
}

export interface DieRenderInfo {
    readonly x: number;
    readonly y: number;
    readonly fillStyle: string;
    readonly text: string;
}

export interface PointCoordinates {
    readonly x: number;
    readonly y: number;
}

export interface ValidityObject {
    [key: string]: boolean;
}
export interface WaferMapValidity extends ValidityObject {
    readonly invalidGridDimensions: boolean;
}
