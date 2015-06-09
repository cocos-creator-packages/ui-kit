Polymer({
    is: 'editor-unit-input',

    behaviors: [EditorUI.focusable],

    properties: {
        value: {
            type: Number,
            notify: true,
            value: 0,
            observer: '_valueChanged'
        },
        
        invalid: false
    },


    ready: function () {
        this._initFocusable(this.$.inputArea);
    },

    _valueChanged: function () {

    },

    _onChange: function () {
        if (this.value === '') {
            this.value = 0;
        }
    },

    _stepUp: function () {
        this.$.inputArea.stepUp();
        this.value = this.$.inputArea.valueAsNumber;
    },

    _stepDown: function () {
        this.$.inputArea.stepDown();
        this.value = this.$.inputArea.valueAsNumber;
    },

    _growUp: function (event) {
        this.timeoutID = setTimeout( function () {
            this.holdingID = setInterval( function () {
                this._stepUp();
            }.bind(this), 50);
        }.bind(this), 500 );
    },

    _growDown: function (event) {
        this.timeoutID = setTimeout( function () {
            this.holdingID = setInterval( function () {
                this._stepDown();
            }.bind(this), 50);
        }.bind(this), 500 );
    },

    _stopGrow: function () {
        clearInterval(this.holdingID);
        this.holdingID = null;

        clearTimeout(this.timeoutID);
        this.timeoutID = null;
    },
});
