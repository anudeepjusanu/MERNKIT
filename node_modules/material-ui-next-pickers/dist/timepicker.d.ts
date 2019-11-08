import * as React from 'react';
import { StyledComponentProps } from '@material-ui/core/styles';
import { FormControlProps } from '@material-ui/core/FormControl';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { InputProps } from '@material-ui/core/Input';
import { InputLabelProps } from '@material-ui/core/InputLabel';
import { ClockProps } from './clock';
declare class TimeFormatInput extends React.Component<TimeFormatInputProps, TimeFormatInputState> {
    action: any;
    input: Element | Text;
    clock: Element | Text;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    labelRef: (label: React.ReactInstance) => void;
    onWindowClick: (event: MouseEvent) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    toggleShowClock: () => void;
    closeClock: () => void;
    render(): JSX.Element[];
}
export interface TimeFormatInputProps extends React.Props<{}>, StyledComponentProps {
    name: string;
    label?: string;
    value: Date;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
    selectableMinutesInterval?: number;
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    disabled?: boolean;
    error?: string;
    fullWidth?: boolean;
    dialog?: boolean;
    okToConfirm?: boolean;
    endIcon?: Node;
    className?: string;
    FormControlProps?: FormControlProps;
    InputLabelProps?: InputLabelProps;
    InputProps?: InputProps;
    FormHelperTextProps?: FormHelperTextProps;
    ClockProps?: ClockProps;
}
export interface TimeFormatInputState {
    focus: boolean;
    labelWidth: number;
    clockShow: boolean;
}
export default TimeFormatInput;
