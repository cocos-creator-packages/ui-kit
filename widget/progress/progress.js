Editor.registerWidget( 'editor-progress', {
    is: 'editor-progress',

    properties: {
        value: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_valueChanged'
        },
        succeed: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        },
        failed: {
            type: Boolean,
            value: false,
            reflectToAttribute: true,
        }
    },

    _valueChanged: function () {
        this.value = Math.clamp(this.value,0,1);
        if (Math.clamp((this.value * 100).toFixed(2),0,100) >= 100) {
            this.succeed = true;
        }
        else {
            this.succeed = false;
        }
    },

    _progressStyle: function (value) {
        return 'width:' + Math.clamp(value * 100,0,100) + '%;';
    },

    _valueText: function (value) {
        return parseFloat( Math.clamp((value * 100).toFixed(2),0,100));
    },
});
