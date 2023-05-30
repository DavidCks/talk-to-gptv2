export function getGlobalClassName(): string {
    const className = " ttgptUI "
    return className
}

export function injectStyle(cssText): void {
    const head = document.querySelector("head")
    const style = document.createElement("style")
    style.textContent = cssText
    head.appendChild(style)
}

export function hideClass(className) {
    const elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
        const el: HTMLElement = elements[i] as HTMLElement
        el.style.visibility = 'hidden'
        el.style.transition = 'none'
        el.style.border = 'none'
        el.style.height = '0'
        el.style.width = '0'
        el.style.padding = '0'
        el.style.margin = '0'
    }
}

export function showClass(className) {
    const elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
        const el: HTMLElement = elements[i] as HTMLElement
        el.style.visibility = ''
        el.style.transition = ''
        el.style.border = ''
        el.style.height = ''
        el.style.width = ''
        el.style.padding = ''
        el.style.margin = ''
    }
}