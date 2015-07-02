Editor.registerWidget( 'editor-section', {
    is: 'editor-section',

    behaviors: [EditorUI.focusable],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
    },

    properties: {
        title: {
            type: String,
            value: ''
        },

        folded: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },
    },

    ready: function () {
        this._initFocusable(this);
    },

    _onFoldClick: function () {
        this.folded = !this.folded;
    },

    _foldClass: function ( folded ) {
        if (folded) {
            return 'fa fold fa-caret-right';
        }
        else {
            return 'fa fold fa-caret-down';
        }
    },
 });
