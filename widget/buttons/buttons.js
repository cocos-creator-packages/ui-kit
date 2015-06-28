Editor.registerWidget( 'editor-buttons', {
    is: 'editor-buttons',

    behaviors: [EditorUI.focusable,Polymer.IronMultiSelectableBehavior],

    created: function () {
        this.selectedAttribute = 'selected';
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
    },

    _selectionChange: function () {
        if (this.multi) {
            this.fire('multi-selected-changed');
        }
    },
});
