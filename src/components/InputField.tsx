import React from "react"
import {ValidationRules} from "../types/Validation.ts"
import useValidation from "../hooks/useValidation.tsx"

type InputFieldProps = {
    className?: string,
    name: string,
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    autoComplete?: string,
    type?: string,
    required?: boolean,
    rules?: ValidationRules,
}

const InputField = (props: InputFieldProps) => {
    const {validate, validationResults} = useValidation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.rules) {
            validate(e.target.value, props.rules, props.name)
        }

        props.onChange(e)
    }

    return (
        <div className={props.className}>
            <label htmlFor={props.name} className="form-label">
                {props.label}
                {props.required ? <span className="text-red-500 ms-1">*</span> : null}
            </label>
            <div className="mt-2">
                <input
                    type={props.name ?? 'text'}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={handleInputChange}
                    autoComplete={props.autoComplete ?? 'off'}
                    className={`form-control ${validationResults && !validationResults[0][props.name].valid ? 'is-invalid' : 'is-valid'}`}
                    placeholder={"Please enter " + props.label.toLowerCase()}
                />
                {
                    validationResults && !validationResults[0][props.name].valid
                        ? <div className="invalid-feedback">{validationResults[0][props.name].message}</div>
                        : null
                }
            </div>
        </div>
    )
}


export default InputField