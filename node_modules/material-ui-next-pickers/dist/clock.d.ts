import * as React from 'react';
import { StyledComponentProps } from '@material-ui/core/styles';
declare class Clock extends React.Component<ClockProps, ClockState> {
    clockface: Element;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setClockRadius: () => void;
    getClockRadius: () => number;
    getValue: (options: any[], target: {
        x: number;
        y: number;
    }, origin: {
        x: number;
        y: number;
    }) => any;
    getOriginPoint: () => {
        x: number;
        y: number;
    };
    getMouseTargetPoint: (event: React.MouseEvent<HTMLDivElement>) => {
        x: number;
        y: number;
    };
    getTouchTargetPoint: (event: React.TouchEvent<HTMLDivElement>) => {
        x: number;
        y: number;
    };
    changeValue: (label: "hour" | "minute", selecting: number, event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
    mouseSelectClock: (event: React.MouseEvent<HTMLDivElement>, label: "hour" | "minute", options: number[]) => void;
    touchSelectClock: (event: React.TouchEvent<HTMLDivElement>, label: "hour" | "minute", options: number[]) => void;
    mouseHoverClock: (event: React.MouseEvent<HTMLDivElement>, label: "hour" | "minute", options: number[]) => void;
    touchHoverClock: (event: React.TouchEvent<HTMLDivElement>, label: "hour" | "minute", options: number[]) => void;
    confirmClock: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, label: "hour" | "minute") => void;
    confirmTime: (event: React.MouseEvent<HTMLElement>) => void;
    clickSetMode: (mode: "hour" | "minute") => void;
    clickAmPm: (ampm: "pm" | "am", event: React.MouseEvent<HTMLElement>) => void;
    getSelectedDate: () => {
        hour: number;
        minute: number;
        ampm: string;
    };
    render(): JSX.Element;
}
export interface ClockProps extends React.Props<{}>, StyledComponentProps {
    action: (actions: any) => void;
    value: Date;
    onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
    closeClock: () => void;
    selectableMinutesInterval?: number;
    okToConfirm?: boolean;
    classes?: {
        root?: string;
        digitalContainer?: string;
        clockBackground?: string;
        hand?: string;
        textSelected?: string;
        minuteDotSelected?: string;
    };
}
export interface ClockState {
    mode: 'hour' | 'minute';
    selected: Date;
    selecting: boolean;
    clockRadius: number;
}
export default Clock;
