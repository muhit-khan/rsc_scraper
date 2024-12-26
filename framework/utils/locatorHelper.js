export function PreciseTextLocator(text) {
    return `//*[text()='${text}']`
}

export function PartialTextLocator(partialText) {
    return `//*[contains(text(),'${partialText}')]`
}

export function PreciseClassLocator(className) {
    return `//*[@class='${className}']`
}

export function PartialClassLocator(partialClassName) {
    return `//*[contains(@class,'${partialClassName}')]`
}

export function PreciseIdLocator(id) {
    return `//*[@id='${id}']`
}

export function PartialIdLocator(partialId) {
    return `//*[contains(@id,'${partialId}')]`
}

export function PreciseNameLocator(name) {
    return `//*[@name='${name}']`
}

export function PartialNameLocator(partialName) {
    return `//*[contains(@name,'${partialName}')]`
}

export function PreciseAttributeLocator(attribute, value) {
    return `//*[@${attribute}='${value}']`
}

export function PartialAttributeLocator(attribute, partialValue) {
    return `//*[contains(@${attribute},'${partialValue}')]`
}