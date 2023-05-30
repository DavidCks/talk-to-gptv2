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
    ["textarea", 0],
]
/**
This function creates a map of StylePropertyMapReadOnly objects, each representing the computed styles of an element that matches a given CSS selector. The map keys are the CSS selectors themselves, and the values are the StylePropertyMapReadOnly of the corresponding elements.

The function takes no parameters and uses the 'selectors' array, which must be defined in the same scope as the function, to determine which elements to select and clone.

@example
const selectors: Array<[string, number]> = [["textarea", 1]]
let clonedComputedStyles = cloneComputedStyles();
clonedComputedStyles.get("textarea") // will return the StylePropertyMapReadOnly of the first "textarea" element found one level up in the DOM hierarchy.
@returns A Map object with string keys and StylePropertyMapReadOnly values.
*/
function cloneComputedStyles(): Map<string, StylePropertyMapReadOnly> {
    let styles: Map<string, StylePropertyMapReadOnly> = new Map();
    for (let i: number = 0; i < selectors.length; i++) {
        const querySelector: string = selectors[i][0]
        const parentLevel: number = selectors[i][1]
        let targetElement: Element = document.querySelectorAll(querySelector)[0]
        if (!targetElement) {
            styles.set(querySelector, undefined)
        } else {
            for (let j: number = 0; j < parentLevel; j++) {
                targetElement = targetElement.parentElement;
            }
            styles.set(querySelector, targetElement.computedStyleMap())
        }
    }
    return styles;
}
/**
 * Map of styles.
 * @type {Map<string, StylePropertyMapReadOnly>}
 * @keys Valid keys: 
 * - "textarea"
 */
export const styles: () => Map<string, StylePropertyMapReadOnly> = cloneComputedStyles