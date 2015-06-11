Editor.registerWidget( 'editor-loader', {
    is: 'editor-loader',

    properties: {
        text: {
            type: String,
            notify: true,
            value: '',
        }
    },

    ready: function () {
        this.stopUpdate = false;
        this.originPosition = '';
        this.node = null;
    },

    initLoader: function (node) {
        this.stopUpdate = false;
        this.node = node;
        this.node.style.pointerEvents = 'none';
        this.stopLoading = false;
        this.originPosition = window.getComputedStyle(node)['position'];

        if (this.originPosition !== 'absolute') {
            this.node.style.position = 'relative';
        }

        this.style.background = 'rgba(0,0,0,.5)';
        this.style.position = 'absolute';
        this.style.left = 0;
        this.style.top = 0;
        this.style.right = 0;
        this.style.bottom = 0;
        this.$.animate.style.position = 'absolute';
        this.$.animate.style.left = '50%';
        this.$.animate.style.marginLeft = -this.$.animate.getBoundingClientRect().width / 2 - 5;
        this.$.animate.style.marginTop = this.getBoundingClientRect().height / 2 - this.$.animate.getBoundingClientRect().height / 2;
        node.appendChild(this);
        this._update();
    },

    _update: function () {
        window.requestAnimationFrame(function () {
            if (this.stopUpdate) {
                return;
            }
            this.$.animate.style.marginTop = this.getBoundingClientRect().height / 2 - this.$.animate.getBoundingClientRect().height / 2;
            this._update();
        }.bind(this));
    },

    clear: function () {
        this.stopUpdate = true;
        this.node.style.pointerEvents = 'auto';
        this.node.style.position = this.originPosition;
        this.remove();
    },
});
