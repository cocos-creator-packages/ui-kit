Polymer({
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

        disabled: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        }
    },

    _onClick: function (event) {
        this.fire('selected');
    },

    _confirm: function () {
        if (this.disabled) {
            return;
        }
        this.fire('selected');
    },
});
