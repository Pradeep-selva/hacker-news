import { sortBy } from 'lodash';

export const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse()
}

export const options = [
    { value: 'NONE', label: 'None' },
    { value: 'TITLE', label: 'Title' },
    { value: 'AUTHOR', label: 'Author' },
    { value: 'COMMENTS', label: 'Comments' },
    { value: 'POINTS', label: 'Points' },
];
