Editor.registerWidget( 'editor-loading', {
    is: 'editor-loading',

    properties: {
        disabled: {
            type: Boolean,
            notify: true,
            value: false,
            reflectToAttribute: true
        },
    },
});
