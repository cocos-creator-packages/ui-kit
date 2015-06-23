Editor.registerWidget( 'editor-select', {
    is: 'editor-select',

    behaviors: [EditorUI.focusable, Polymer.IronButtonState],

    listeners: {
        'focus': '_onFocus',
        'blur': '_onBlur',
        'click': '_onClick'
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
        // NOTE: must be get the innerHTML before render.
        this.contentInnerHTML = this.$.options.innerHTML;
    },

    _onClick: function (event) {
        event.stopPropagation();

        if (!this._panel) {
            this._panel = document.createElement('editor-select-panel');
            this._panel.owner = this;
            this._panel.innerHTML = this.contentInnerHTML;
            EditorUI.addHitGhost('cursor', '998', function (event) {
                if (this._panel) {
                    this._panel.hide();
                }

                this.setFocus();
            }.bind(this));
            document.body.appendChild(this._panel);
            this._panel.setFocus();
            this._updateOptions();
        }else {
            if (this._panel) {
                this._panel.hide();
            }
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

            if (this.getBoundingClientRect().bottom + this._panel.getBoundingClientRect().height > document.body.getBoundingClientRect().bottom) {
                this._panel.style.top = 'auto';
                this._panel.style.borderTop = '1px solid #0c70a6';
                this._panel.style.borderBottom = '0px';
                this._panel.style.bottom = document.body.getBoundingClientRect().height - this.getBoundingClientRect().bottom + 29;
            }else {
                this._panel.style.bottom = 'auto';
                this._panel.style.borderBottom = '1px solid #0c70a6';
                this._panel.style.borderTop = '0px';
                this._panel.style.top = this.getBoundingClientRect().top + 23;
            }
            this._panel.style.position = 'absolute';
            this._panel.style.width = this.getBoundingClientRect().width;
            this._panel.style.left = this.getBoundingClientRect().left;

            this._updateOptions();
        }.bind(this));
    },
});
