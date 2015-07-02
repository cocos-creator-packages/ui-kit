Editor.registerWidget( 'editor-section', {
    is: 'editor-section',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'keyup': '_onKeyUp'
    },

    properties: {
        text: {
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

    _onKeyUp: function (event) {
        // press 'enter' and 'space'
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            event.stopPropagation();
            this.folded = !this.folded;
        }
        // press left
        else if (event.keyCode === 37) {
            event.preventDefault();
            event.stopPropagation();
            this.folded = true;
        }
        // press right
        else if (event.keyCode === 39) {
            event.preventDefault();
            event.stopPropagation();
            this.folded = false;
        }

    },
 });
