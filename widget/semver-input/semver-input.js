Editor.registerPanel('editor-semver',{
    is: 'editor-semver',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focusout': '_onFocusOut',
    },

    properties: {
        value: {
            type: String,
            value: '0.0.0',
            observer: '_valueChanged'
        },

        majorVersion: {
            type: String,
            value: '0'
        },

        secondVersion: {
            type: String,
            value: '0'
        },

        revision: {
            type: String,
            value: '0'
        },

        invalid: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        }
    },

    ready: function () {
        this._initFocusable(this);
    },

    _valueChanged: function () {
        var version = this.value.toLowerCase().split('.');
        this.majorVersion = version[0];
        this.secondVersion = version[1];
        this.revision = version[2];
        if (/^(=|>=|<=|>|<|\^|)[0-9]+\.[0-9]+\.([0-9]+|x)$/.test(this.value.toLowerCase())) {
            this.invalid = false;
            return;
        }
        this.invalid = true;
    },

    _onFocusOut: function ( event ) {
        this.value = this.majorVersion + '.' + this.secondVersion + '.' + this.revision;
        if (/^(=|>=|<=|>|<|\^|)[0-9]+\.[0-9]+\.([0-9]+|x)$/.test(this.value.toLowerCase())) {
            this.invalid = false;
            return;
        }
        this.invalid = true;
    },

});
