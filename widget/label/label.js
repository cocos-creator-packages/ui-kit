Editor.registerWidget( 'editor-label', {
    is: 'editor-label',

    properties: {
        disabled: {
            type: Boolean,
            notify: true,
            value: false,
            reflectToAttribute: true,
        },
    },
});
