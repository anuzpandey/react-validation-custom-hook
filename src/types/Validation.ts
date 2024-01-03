export type ValidationRules = {
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    regex?: RegExp;
    email?: boolean;
    number?: boolean;
    integer?: boolean;
    float?: boolean;
    alpha?: boolean;
    alpha_numeric?: boolean;
    alpha_dash?: boolean;
    alpha_spaces?: boolean;
    confirmed?: boolean;
    url?: boolean;
    unique?: string[] | number[];
}