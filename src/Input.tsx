import {Control, FieldPath, FieldValues} from "react-hook-form/dist/types";
import {useController} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {ComponentPropsWithoutRef} from "react";

const TextInput = (props: ComponentPropsWithoutRef<'input'>) => {
    return <input type="text" {...props} />;
};

export const TextInputWrapper = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FieldProps<TFieldValues, TName>) => {

    return (
        <FieldRenderer
            {...props}
            renderFunction={TextInput}
        />
    );
};

const FieldRenderer = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: FieldRendererProps<TFieldValues, TName>) => {

    const {
        field,
        fieldState: {error}
    } = useController({
        name: props.name,
        control: props.control,
        rules: props.rules
    });

    return (
        <>
            {props.label}
            {props.renderFunction(field)}
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
    );
};


export interface ExternalFieldRenderProps {
    label?: string;
}

export interface HookFormProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    name: TName;
    control: Control<TFieldValues>;
    rules?: RegisterOptions
}

export interface RendererProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
    renderFunction: (props: ControllerRenderProps<TFieldValues, TName>) => JSX.Element
}

export type FieldRendererProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> =
    ExternalFieldRenderProps &
    HookFormProps<TFieldValues, TName> &
    RendererProps<TFieldValues, TName>

export type FieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> =
    ExternalFieldRenderProps &
    HookFormProps<TFieldValues, TName>
