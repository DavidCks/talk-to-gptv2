/**
 * Each item in the array contains a query selector string and a number that represents the index of the parent element to select from.
@example
<div>
<p id="hello"></p>
</div>

const selectors: Array<[string, number]> = [
["#hello", 1],
];
@remarks
this would select the <div> element, which is the first parent of the element with the id "hello"
*/
const selectors: Array<[string, number]> = [
    ["textarea", 1],
]
/**
This function creates a map of DOMTokenList objects, each representing the class attribute of an element that matches a given CSS selector. The map keys are the CSS selectors themselves, and the values are the class lists of the corresponding elements.

The function takes no parameters and uses the 'selectors' array, which must be defined in the same scope as the function, to determine which elements to select and clone.

@example
const selectors: Array<[string, number]> = [["textarea", 1]]
let clonedClassList = cloneClassList();
clonedClassList.get("textarea") // will return the DOMTokenList of the first "textarea" element found one level up in the DOM hierarchy.
@returns A Map object with string keys and DOMTokenList values.
*/
function cloneClassList(): Map<string, string> {
    let classes: Map<string, string> = new Map();
    for (let i: number = 0; i < selectors.length; i++) {
        const querySelector: string = selectors[i][0]
        const parentLevel: number = selectors[i][1]
        let targetElement: Element = document.querySelectorAll(querySelector)[0]
        if (!targetElement) {
            console.log("couldnt find classes, setting defaults...")
            classes.set(querySelector, ``)
        } else {
            for (let j: number = 0; j < parentLevel; j++) {
                targetElement = targetElement.parentElement;
            }
            classes.set(querySelector, targetElement.classList.toString())
        }
    }
    return classes;
}
/**
 * Map of classList.
 * @type {Map<string, string>}
 * @keys Valid keys: 
 * - "textarea"
 */
export const classes: () => Map<string, string> = cloneClassList
export const classList: () => string = () => `${classes().get('textarea')}`