Editor.registerWidget( 'editor-buttons', {
    is: 'editor-buttons',

    behaviors: [EditorUI.focusable,Polymer.IronMultiSelectableBehavior],

    properties: {
        selected: {
            type: Number,
            value: null,
            observer: '_selectedChanged',
        },
    },

    ready: function () {
        this.noNavigate = this.nofocus;
        this._initFocusable(this);
        this.selectedAttribute = 'selected';
    },

    _selectedChanged: function () {
        this.fire('selected');
    },

    _selectionChange: function () {
        if (this.multi) {
            this.fire('selected');
        }
    },
});
