import React from "react"

type RadioFieldProps = {
    className?: string
    name: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    autoComplete?: string
    required?: boolean
    values: {
        label: string
        value: string
    }[]
}

const RadioField = (props: RadioFieldProps) => {
    return (
        <fieldset className={"sm:col-span-6"}>
            <legend className="text-sm font-semibold leading-6 text-gray-900">{props.label}</legend>
            <div className="mt-2 flex gap-8">
                {
                    props.values.map((value, valueIndex) => (
                        <div className="relative flex gap-x-3" key={valueIndex}>
                            <div className="flex h-6 items-center">
                                <input
                                    id={value.value}
                                    name={props.name}
                                    value={value.value}
                                    onChange={props.onChange}
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor={value.value} className="font-medium text-gray-900">
                                    {value.label}
                                </label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </fieldset>
    )
}


export default RadioField