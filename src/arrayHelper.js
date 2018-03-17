// Array intersection functions: pass in a comparator predicate to determine how each element should be compared. Skip the comparator (or pass in something falsey) to use the standard comparator of the element. It is assumed that all objects in the arrays are of the same "type".

// Get elements which are found in both input arrays. 
export const intersection = (left, right) => comparator =>
    left.filter((leftElement) => comparator ? right.find((rightElement) => comparator(leftElement, rightElement)) : right.indexOf(leftElement) !== -1);

// Get elements found only in the left array.
export const leftDifference = (left, right) => comparator =>
    left.filter((leftElement) => comparator ? !right.find((rightElement) => comparator(leftElement, rightElement)) : right.indexOf(leftElement) === -1);

// Get elements found only in the right array.
export const rightDifference = (left, right) => comparator =>
    right.filter((rightElement) => comparator ? !left.find((leftElement) => comparator(leftElement, rightElement)) : left.indexOf(rightElement) === -1);

// Get elements which are not common to both arrays.
export const symmetricalDifference = (left, right) => comparator =>
    leftDifference(left, right)(comparator).concat(rightDifference(left, right)(comparator));

export default {
    intersection,
    leftDifference,
    rightDifference,
    symmetricalDifference
};