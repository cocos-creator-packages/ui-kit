Editor.registerElement({
    behaviors: [EditorUI.focusable,Polymer.IronMultiSelectableBehavior],

    created: function () {
        this.selectedAttribute = 'selected';
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    attached: function () {
        var _minWidth = 0;
        Polymer.dom(this).children.forEach(function (item) {
            _minWidth += item.getBoundingClientRect().width;
        });
        this.style.minWidth = _minWidth + 2 + 'px';
    },

    _selectionChange: function () {
        if (this.multi) {
            this.fire('multi-selected-changed');
        }
    },
});
