'use strict';

describe('<editor-label>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/label.html');

  it('can be disabled', function( done ) {
    let labelEL = Helper.targetEL;

    labelEL.disabled = true;
    expect(labelEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });
});
