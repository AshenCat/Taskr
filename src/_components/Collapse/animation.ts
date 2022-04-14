export const collapseChildren = {
    initial: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            // staggerDirection: 1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    }
}

export const collapseChildrenItem = {
    initial: {
        x: 10,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: -10,
        opacity: 0
    }
}