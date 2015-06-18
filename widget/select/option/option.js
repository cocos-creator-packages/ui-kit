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
        var panel = event.currentTarget.parentNode;
        var root = event.currentTarget.parentNode.owner;
        root.value = this.value;
        panel.hide();
    },
});
