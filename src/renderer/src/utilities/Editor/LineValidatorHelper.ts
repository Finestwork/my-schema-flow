/**
 * This will check if 'use' keyword has been used in the text editor
 */
export const checkUseKeywordExistence = (code: string) => {
    const Regex = /use\s*[A-Za-z]*\s*;?/;
    const Lines = code.split('\n');
    return Lines.some((line) => Regex.test(line));
};
