import {FieldPath, FieldValues} from "react-hook-form/dist/types";
import {InputText, InputTextProps, Label} from "../../sandbox/react-hook-form/src/components/InputText";
import {useController} from "react-hook-form";
import {Component} from "react";

export function TextInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({name, control, rules}: InputTextProps<TFieldValues, TName>) {

    const {
        field,
        fieldState: {error}
    } = useController({
        name,
        control,
        rules
    });

    return (
        <>
            <input
                type="text"
                {...field}
            />
            <pre>
                {JSON.stringify(error, null, 2)}
            </pre>
        </>
    );
}

const LabelHoc = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(InputComponent: React.ComponentType<InputTextProps<TFieldValues, TName>>) =>
    class ShadowClassName extends Component<InputTextProps<TFieldValues, TName> & Label> {
        render() {
            const {label, ...props} = this.props;

            return (
                <fieldset>
                    <label>
                        {label}
                    </label>
                    <InputComponent
                        {...props}
                    />
                </fieldset>
            );
        }
    }

export const InputHoc = LabelHoc(InputText);
