export const intersection = (left, right) => comparator =>
    left.filter((leftElement) => comparator ? right.find((rightElement) => comparator(leftElement, rightElement)) : right.indexOf(leftElement) !== -1);

export const leftDifference = (left, right) => comparator =>
    left.filter((leftElement) => comparator ? !right.find((rightElement) => comparator(leftElement, rightElement)) : right.indexOf(leftElement) === -1);

export const rightDifference = (left, right) => comparator =>
    right.filter((rightElement) => comparator ? !left.find((leftElement) => comparator(leftElement, rightElement)) : left.indexOf(rightElement) === -1);

export const symmetricalDifference = (left, right) => comparator =>
    leftDifference(left, right)(comparator).concat(rightDifference(left, right)(comparator));

export default {
    intersection,
    leftDifference,
    rightDifference,
    symmetricalDifference
};