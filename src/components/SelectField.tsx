import React from "react"

type SelectFieldProps = {
    className?: string
    name: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    autoComplete?: string
    values: string[]
    required?: boolean
}

const SelectField = (props: SelectFieldProps) => {
    return (
        <div className={props.className}>
            <label htmlFor={props.name} className="form-label">
                {props.label}
                {
                    props.required ? <span className="text-red-500 ms-1">*</span> : null
                }
            </label>
            <div className="mt-2">
                <select
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    autoComplete={props.autoComplete ?? 'off'}
                    className="form-control"
                >
                    {props.values.map((value, valueIndex) => (
                        <option
                            key={valueIndex}
                            value={value}
                        >{value}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}


export default SelectField