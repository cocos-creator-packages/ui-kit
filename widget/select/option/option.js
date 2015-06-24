Editor.registerWidget( 'editor-option', {
    is: 'editor-option',

    listeners: {
        'click': '_onClick',
    },

    properties: {
        value: {
            type: String,
            notify: true,
            value: ''
        },

        selected: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
    },

    _onClick: function (event) {
        this.fire('selected');
    },
});
