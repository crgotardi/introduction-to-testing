export const add = (a, b) => {
    if (typeof a !== 'number') {
        a = Number(a)
    }

    if (typeof b !== 'number') {
        b = Number(b)
    }

    if (isNaN(a) || isNaN(b)) {
        throw new Error()
    }

    return a + b
};

export const subtract = (a, b) => {
    return a - b
};

export const multiply = (a, b) => {
    return a * b
};

export const divide = (a, b) => {
    return a / b
};