export function toPixel(value, context = document.documentElement) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.width = value;
    context.appendChild(div);
    let pixels = div.offsetWidth;
    context.removeChild(div);
    return `${pixels}px`;
}

export function assertHtmlElement(object){
    if(!(object instanceof Element)){
        throw new TypeError("Expected an HTML element, but received " + typeof object);
    }
}

export function assertBetween0And100(number){
    if (typeof number !== "number" || isNaN(number)) {
        throw new Error("Invalid input: Value must be a number.");
    }
    if (number < 0 || 100 < number) {
        throw new Error("Invalid input: Number must be between 0 and 100.");
    }
}