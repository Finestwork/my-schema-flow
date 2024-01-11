import { editor } from 'monaco-editor';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

export const getEditorOptions = (
    options: IStandaloneEditorConstructionOptions = {},
): IStandaloneEditorConstructionOptions => {
    const DefaultOptions = {
        value: '',
        language: '',
        theme: 'light',
        fontSize: 14,
        fontFamily: 'NeonMono',
        lineHeight: 35,
        fontWeight: '700',
        cursorSmoothCaretAnimation: 'on',
        cursorBlinking: 'expand',
        tabSize: 2,
        fontLigatures:
            "'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'calt', 'dlig'",
        minimap: {
            enabled: false,
        },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 2,
    };
    return Object.assign(DefaultOptions, options);
};
