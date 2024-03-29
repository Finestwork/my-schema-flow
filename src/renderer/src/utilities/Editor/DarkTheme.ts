import { editor } from 'monaco-editor';
import IStandaloneThemeData = editor.IStandaloneThemeData;

export default <IStandaloneThemeData>{
    inherit: true,
    base: 'vs-dark',
    colors: {
        focusBorder: '#FFFFFF00',
        foreground: '#8F93A2',
        descriptionForeground: '#8F93A260',
        errorForeground: '#FF537040',
        'textLink.foreground': '#80CBC4',
        'textLink.activeForeground': '#8F93A2',
        'dropdown.background': '#0F111A',
        'dropdown.border': '#FFFFFF10',
        'dropdown.foreground': '#8F93A2',
        'dropdown.listBackground': '#090B10',
        'input.background': '#1A1C25',
        'input.border': '#FFFFFF10',
        'input.foreground': '#EEFFFF',
        'input.placeholderForeground': '#8F93A260',
        'badge.foreground': '#464B5D',
        'badge.background': '#00000030',
        'progressBar.background': '#80CBC4',
        'titleBar.activeForeground': '#8F93A2',
        'titleBar.activeBackground': '#090B10',
        'titleBar.inactiveForeground': '#4B526D',
        'titleBar.inactiveBackground': '#090B10',
        'titleBar.border': '#00000060',
        'activityBar.foreground': '#8F93A2',
        'activityBar.inactiveForeground': '#8F93A2',
        'activityBar.background': '#090B10',
        'activityBarBadge.foreground': '#000000',
        'activityBarBadge.background': '#80CBC4',
        'activityBar.activeBorder': '#00000060',
        'activityBar.border': '#00000060',
        'sideBar.foreground': '#4B526D',
        'sideBar.background': '#090B10',
        'sideBar.border': '#00000060',
        'sideBarTitle.foreground': '#8F93A2',
        'sideBarSectionHeader.foreground': '#00000060',
        'sideBarSectionHeader.background': '#090B10',
        'sideBarSectionHeader.border': '#00000060',
        'list.hoverForeground': '#FFFFFF',
        'list.inactiveSelectionForeground': '#80CBC4',
        'list.activeSelectionForeground': '#80CBC4',
        'list.hoverBackground': '#090B10',
        'list.inactiveSelectionBackground': '#00000030',
        'list.activeSelectionBackground': '#090B10',
        'list.inactiveFocusBackground': '#00000030',
        'list.focusBackground': '#8F93A220',
        'tree.indentGuidesStroke': '#3B3F51',
        'notificationCenterHeader.foreground': '8F93A2',
        'notificationCenterHeader.background': '#0F111A',
        'notifications.foreground': '#8F93A2',
        'notifications.background': '#0F111A',
        'notifications.border': '#8F93A2',
        'notificationsErrorIcon.foreground': '#ea4a5a',
        'notificationsWarningIcon.foreground': '#ffab70',
        'notificationsInfoIcon.foreground': '#79b8ff',
        'pickerGroup.border': '#444d56',
        'pickerGroup.foreground': '#80CBC4',
        'statusBar.foreground': '#4B526D',
        'statusBar.background': '#090B10',
        'statusBar.border': '#00000060',
        'statusBar.noFolderBackground': '#0F111A',
        'statusBar.debuggingBackground': '#C792EA',
        'statusBar.debuggingForeground': '#ffffff ',
        'editorGroupHeader.tabsBackground': '#0F111A',
        'editorGroupHeader.tabsBorder': '#00000030',
        'editorGroup.border': '#00000030',
        'tab.activeForeground': '#80CBC4',
        'tab.inactiveForeground': '#4B526D',
        'tab.inactiveBackground': '#0F111A',
        'tab.activeBackground': '#0F111A',
        'tab.hoverBackground': '#2F344A',
        'tab.unfocusedHoverBackground': '#0F111A',
        'tab.border': '#0F111A',
        'tab.unfocusedActiveBorderTop': '#464B5D',
        'tab.activeBorder': '#80CBC4',
        'tab.unfocusedActiveBorder': '#464B5D',
        'tab.activeBorderTop': '#464B5D',
        'breadcrumb.foreground': '#0F111A',
        'breadcrumb.focusForeground': '#8F93A2',
        'breadcrumb.activeSelectionForeground': '#80CBC4',
        'breadcrumbPicker.background': '#090B10',
        'editor.foreground': '#8F93A2',
        'editor.background': '#0F111A',
        'editorWidget.background': '#090B10',
        'editor.foldBackground': '#0F111A',
        'editor.lineHighlightBackground': '#00000050',
        'editorLineNumber.foreground': '#3B3F5180',
        'editorLineNumber.activeForeground': '#4B526D',
        'editorIndentGuide.background': '#3B3F5170',
        'editorIndentGuide.activeBackground': '#3B3F51',
        'editorWhitespace.foreground': '#8F93A240',
        'editorCursor.foreground': '#FFCC00',
        'editor.findMatchBackground': '#000000',
        'editor.findMatchHighlightBackground': '#00000050',
        'editor.inactiveSelectionBackground': '#00000050',
        'editor.selectionBackground': '#717CB450',
        'editor.selectionHighlightBackground': '#FFCC0020',
        'editor.selectionHighlightBorder': '#FFCC0020',
        'editor.wordHighlightBackground': '#FFCC0020',
        'editor.wordHighlightStrongBackground': '#D0A60021',
        'editor.wordHighlightBorder': '#FFCC0020',
        'editor.wordHighlightStrongBorder': '#D0A60021',
        'editorBracketMatch.background': '#0F111A',
        'editorBracketMatch.border': '#FFCC0050',
        'editorGutter.modifiedBackground': '#82AAFF60',
        'editorGutter.addedBackground': '#C3E88D60',
        'editorGutter.deletedBackground': '#FF537060',
        'diffEditor.insertedTextBackground': '#C3E88D15',
        'diffEditor.removedTextBackground': '#FF537020',
        'scrollbar.shadow': '#0F111A00',
        'scrollbarSlider.background': '#8F93A220',
        'scrollbarSlider.hoverBackground': '#393E5021',
        'scrollbarSlider.activeBackground': '#80CBC4',
        'editorOverviewRuler.border': '#0F111A',
        'panel.background': '#090B10',
        'panel.border': '#00000060',
        'panelTitle.activeBorder': '#80CBC4',
        'panelTitle.activeForeground': '#FFFFFF',
        'panelTitle.inactiveForeground': '#8F93A2',
        'panelInput.border': '#80CBC4',
        'peekViewEditor.matchHighlightBackground': '#717CB450',
        'peekViewResult.matchHighlightBackground': '#717CB450',
        'peekViewEditor.background': '#8F93A205',
        'peekViewResult.background': '#8F93A205',
        'settings.headerForeground': '#80CBC4',
        'settings.modifiedItemIndicator': '#80CBC4',

        'textBlockQuote.background': '#24292e',
        'textBlockQuote.border': '#444d56',
        'textCodeBlock.background': '#2f363d',
        'textPreformat.foreground': '#d1d5da',
        'textSeparator.foreground': '#586069',
        'button.background': '#176f2c',
        'button.foreground': '#dcffe4',
        'button.hoverBackground': '#22863a',
        'checkbox.background': '#444d56',
        'quickInput.background': '#24292e',
        'quickInput.foreground': '#e1e4e8',
    },
    rules: [
        {
            fontStyle: 'italic',
            foreground: '#464B5D',
            token: 'comment',
        },
        {
            fontStyle: 'italic',
            foreground: '#464B5D',
            token: 'punctuation.definition.comment',
        },
        {
            fontStyle: 'italic',
            foreground: '#464B5D',
            token: 'string.comment',
        },
        {
            foreground: '#8F93A2',
            token: 'constant',
        },
        {
            foreground: '#8F93A2',
            token: 'entity.name.constant',
        },
        {
            foreground: '#f07178',
            token: 'variable.other.constant',
        },
        {
            fontStyle: 'italic',
            foreground: '#FF5370',
            token: 'variable.language',
        },
        {
            foreground: '#B2CCD6',
            token: 'entity',
        },
        {
            foreground: '#FFCB6B',
            token: 'entity.name',
        },
        {
            foreground: '#FF5370',
            token: 'variable.parameter.function',
        },
        {
            foreground: '#f07178',
            token: 'entity.name.tag',
        },
        {
            fontStyle: 'italic',
            foreground: '#89DDFF',
            token: 'keyword',
        },
        {
            foreground: '#C792EA',
            fontStyle: 'italic',
            token: 'storage',
        },
        {
            fontStyle: 'italic',
            foreground: '#C792EA',
            token: 'storage.type',
        },
        {
            fontStyle: 'italic',
            foreground: '#C792EA',
            token: 'storage.modifier.package',
        },
        {
            fontStyle: 'italic',
            foreground: '#C792EA',
            token: 'storage.modifier.import',
        },
        {
            fontStyle: 'italic',
            foreground: '#C792EA',
            token: 'storage.type.java',
        },
        {
            fontStyle: 'normal',
            foreground: '#C3E88D',
            token: 'string',
        },
        {
            fontStyle: 'italic',
            foreground: '#82AAFF',
            token: 'punctuation.definition.string',
        },
        {
            foreground: '#89DDFF',
            token: 'string punctuation.section.embedded source',
        },
        {
            foreground: '#79b8ff',
            token: 'support',
        },
        {
            foreground: '#79b8ff',
            token: 'meta.property-name',
        },
        {
            foreground: '#ffab70',
            token: 'variable',
        },
        {
            foreground: '#e1e4e8',
            token: 'variable.other',
        },
        {
            fontStyle: 'italic',
            foreground: '#fdaeb7',
            token: 'invalid.broken',
        },
        {
            fontStyle: 'italic',
            foreground: '#fdaeb7',
            token: 'invalid.deprecated',
        },
        {
            fontStyle: 'italic',
            foreground: '#fdaeb7',
            token: 'invalid.illegal',
        },
        {
            fontStyle: 'italic',
            foreground: '#fdaeb7',
            token: 'invalid.unimplemented',
        },
        {
            fontStyle: 'italic underline',
            background: '#f97583',
            foreground: '#24292e',
            content: '^M',
            token: 'carriage-return',
        },
        {
            foreground: '#fdaeb7',
            token: 'message.error',
        },
        {
            foreground: '#e1e4e8',
            token: 'string source',
        },
        {
            foreground: '#79b8ff',
            token: 'string variable',
        },
        {
            foreground: '#dbedff',
            token: 'source.regexp',
        },
        {
            foreground: '#dbedff',
            token: 'string.regexp',
        },
        {
            foreground: '#dbedff',
            token: 'string.regexp.character-class',
        },
        {
            foreground: '#dbedff',
            token: 'string.regexp constant.character.escape',
        },
        {
            foreground: '#dbedff',
            token: 'string.regexp source.ruby.embedded',
        },
        {
            foreground: '#dbedff',
            token: 'string.regexp string.regexp.arbitrary-repitition',
        },
        {
            fontStyle: 'bold',
            foreground: '#85e89d',
            token: 'string.regexp constant.character.escape',
        },
        {
            foreground: '#79b8ff',
            token: 'support.constant',
        },
        {
            foreground: '#79b8ff',
            token: 'support.variable',
        },
        {
            foreground: '#79b8ff',
            token: 'meta.module-reference',
        },
        {
            foreground: '#ffab70',
            token: 'punctuation.definition.list.begin.markdown',
        },
        {
            fontStyle: 'bold',
            foreground: '#79b8ff',
            token: 'markup.heading',
        },
        {
            fontStyle: 'bold',
            foreground: '#79b8ff',
            token: 'markup.heading entity.name',
        },
        {
            foreground: '#85e89d',
            token: 'markup.quote',
        },
        {
            fontStyle: 'italic',
            foreground: '#e1e4e8',
            token: 'markup.italic',
        },
        {
            fontStyle: 'bold',
            foreground: '#e1e4e8',
            token: 'markup.bold',
        },
        {
            foreground: '#79b8ff',
            token: 'markup.raw',
        },
        {
            background: '#86181d',
            foreground: '#fdaeb7',
            token: 'markup.deleted',
        },
        {
            background: '#86181d',
            foreground: '#fdaeb7',
            token: 'meta.diff.header.from-file',
        },
        {
            background: '#86181d',
            foreground: '#fdaeb7',
            token: 'punctuation.definition.deleted',
        },
        {
            background: '#144620',
            foreground: '#85e89d',
            token: 'markup.inserted',
        },
        {
            background: '#144620',
            foreground: '#85e89d',
            token: 'meta.diff.header.to-file',
        },
        {
            background: '#144620',
            foreground: '#85e89d',
            token: 'punctuation.definition.inserted',
        },
        {
            background: '#c24e00',
            foreground: '#ffab70',
            token: 'markup.changed',
        },
        {
            background: '#c24e00',
            foreground: '#ffab70',
            token: 'punctuation.definition.changed',
        },
        {
            foreground: '#2f363d',
            background: '#79b8ff',
            token: 'markup.ignored',
        },
        {
            foreground: '#2f363d',
            background: '#79b8ff',
            token: 'markup.untracked',
        },
        {
            foreground: '#b392f0',
            fontStyle: 'bold',
            token: 'meta.diff.range',
        },
        {
            foreground: '#79b8ff',
            token: 'meta.diff.header',
        },
        {
            fontStyle: 'bold',
            foreground: '#79b8ff',
            token: 'meta.separator',
        },
        {
            foreground: '#79b8ff',
            token: 'meta.output',
        },
        {
            foreground: '#d1d5da',
            token: 'brackethighlighter.tag',
        },
        {
            foreground: '#d1d5da',
            token: 'brackethighlighter.curly',
        },
        {
            foreground: '#d1d5da',
            token: 'brackethighlighter.round',
        },
        {
            foreground: '#d1d5da',
            token: 'brackethighlighter.square',
        },
        {
            foreground: '#d1d5da',
            token: 'brackethighlighter.angle',
        },
        {
            foreground: '#d1d5da',
            token: 'brackethighlighter.quote',
        },
        {
            foreground: '#fdaeb7',
            token: 'brackethighlighter.unmatched',
        },
        {
            foreground: '#dbedff',
            fontStyle: 'underline',
            token: 'constant.other.reference.link',
        },
        {
            foreground: '#dbedff',
            fontStyle: 'underline',
            token: 'string.other.link',
        },
    ],
    encodedTokensColors: [],
};
