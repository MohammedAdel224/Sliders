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