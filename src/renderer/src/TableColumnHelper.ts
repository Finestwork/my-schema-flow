export const sortConstraintKeys = (arr: { keyConstraint: 'PK' | 'FK' | '' }[]) => {
    return arr.slice().sort((a, b) => {
        if (a.keyConstraint === b.keyConstraint) {
            return 0;
        }
        if (b.keyConstraint === 'PK') {
            return a.keyConstraint === null ? -1 : 1;
        }
        if (a.keyConstraint === 'FK') {
            return b.keyConstraint === null ? 1 : -1;
        }
        return 1;
    });
};
