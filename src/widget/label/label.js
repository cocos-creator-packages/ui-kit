'use strict';

Editor.polymerElement({
  properties: {
    disabled: {
      type: Boolean,
      notify: true,
      value: false,
      reflectToAttribute: true,
    },
  },
});
