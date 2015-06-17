Editor.registerWidget( 'editor-select', {
    is: 'editor-select',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'focused-changed': '_onFocusedChanged'
    },

    properties: {
        placeholder: {
            type: String,
            notify: true,
            value: ''
        },

        value: {
            type: String,
            notify: true,
            value: '',
            observer: 'valueChanged'
        },

        focuschild: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    _onClick: function () {
        event.stopPropagation();
        if (!this._panel) {
            this._panel = document.createElement('editor-select-panel');
            this._panel.owner = this;
            this._panel.$.items.innerHTML = this.$.options.innerHTML;
            document.body.appendChild(this._panel);
            this._updateOptions();
        }
        else {
            this._panel.remove();
            this._panel = null;
        }
    },

    valueChanged: function () {
        if (this.value !== '') {
            this.$.placeholder.style.display = 'none';
            this.$.text.style.display = 'block';
        }
        else {
            this.$.placeholder.style.display = 'block';
            this.$.text.style.display = 'none';
        }
    },

    _updateOptions: function () {
        window.requestAnimationFrame ( function () {
            if (!this._panel)
                return;
            this._panel.style.position = 'absolute';
            this._panel.style.width = this.getBoundingClientRect().width;
            this._panel.style.left = this.getBoundingClientRect().left;
            this._panel.style.top = this.getBoundingClientRect().top + 23;
            this._updateOptions();
        }.bind(this));
    },

    _onFocusedChanged: function (event) {
        if ( event.detail.value ) {
            this.focuschild = false;
        }
        else {
            if (this._panel && this._panel.focused === false) {
                this._panel.remove();
                this._panel = null;
            }
        }
    },
});
