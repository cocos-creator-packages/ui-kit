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
    },

    _onClick: function (event) {
        var panel = event.currentTarget.parentElement.parentNode;
        var root = event.currentTarget.parentElement.parentNode.owner;
        root.value = this.value;
        panel.hide();
    },
});
