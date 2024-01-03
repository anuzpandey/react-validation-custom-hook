import {ValidationRules} from "../types/Validation.ts"
import {useState} from "react"

type ValidationResponse = {
    [name: string]: {
        valid: boolean;
        message: string;
        type?: string;
    }
}

export default function useValidation() {

    const [validationResults, setValidationResults] = useState<ValidationResponse[] | undefined>()

    const min_length = (value: string, min: number, name: string, label: string): ValidationResponse => {
        const valid = value.length >= min

        return {
            [name]: {
                valid,
                message: valid ? 'success' : `${label} must be at least ${min} characters.`,
                type: 'min_length',
            }
        }
    }

    const max_length = (value: string, max: number, name: string, label: string): ValidationResponse => {
        const valid = value.length <= max

        return {
            [name]: {
                valid,
                message: valid ? 'success' : `${label} must be less than or equal to ${max} characters.`,
                type: 'max_length',
            }
        }
    }

    const email = (value: string, name: string, label: string): ValidationResponse => {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

        return {
            [name]: {
                valid,
                message: valid ? 'success' : `${label} must be a valid email address.`,
                type: 'email',
            }
        }
    }

    const min_value = (value: number, min: number, name: string, label: string): ValidationResponse => {
        const valid = value >= min

        return {
            [name]: {
                valid,
                message: valid ? 'success' : `${label} must be greater than or equal to ${min}.`,
                type: 'min_value',
            }
        }
    }

    const max_value = (value: number, max: number, name: string, label: string) => {
        const valid = value <= max

        return {
            [name]: {
                valid,
                message: valid ? 'success' : `${label} must be less than or equal to ${max}.`,
                type: 'max_value',
            }
        }
    }

    const required = (value: string, name: string, label: string) => {
        const valid = value.length > 0

        return {
            [name]: {
                valid,
                message: valid ? 'success' : `${label} is required.`,
                type: 'required',
            }
        }
    }


    const validate = (value: string | number, rules: ValidationRules, name: string, label: string) => {
        let result: ValidationResponse = {}

        setValidationResults(undefined)

        if (rules.required) {
            result = required(value as string, name, label)
            if (!result[name].valid) {
                return setValidationResult(result, name, 'required')
            }
        }

        if (rules.min_length) {
            result = min_length(value as string, rules.min_length, name, label)
            if (!result[name].valid) {
                return setValidationResult(result, name, 'min_length')
            }
        }

        if (rules.max_length) {
            result = max_length(value as string, rules.max_length, name, label)
            if (!result[name].valid) {
                return setValidationResult(result, name, 'max_length')
            }
        }

        if (rules.email) {
            result = email(value as string, name, label)
            if (!result[name].valid) {
                return setValidationResult(result, name, 'email')
            }
        }
    }

    const setValidationResult = (result: ValidationResponse, name: string, type: string) => {
        setValidationResults((prevResults: ValidationResponse[] | undefined) => {

            if (!prevResults) {
                return [result]
            }

            let errorExists = false

            prevResults.forEach((prevResult: ValidationResponse) => {
                if (prevResult[name].type === type) {
                    errorExists = true
                }
            })

            if (!errorExists) {
                prevResults.push(result)
                return prevResults
            }

            return prevResults.filter((prevResult: ValidationResponse) => {
                return prevResult[name].type !== type
            })
        })

        return validationResults
    }

    return {
        min_value,
        max_value,
        min_length,
        max_length,
        email,
        required,
        validate,
        validationResults,
    }
}