'use strict';

Editor.polymerElement({
  properties: {
    value: {
      type: String,
      value: ''
    },

    text: {
      type: String,
      value: ''
    },

    disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    }
  },
});
