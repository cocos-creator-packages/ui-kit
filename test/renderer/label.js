'use strict';

describe('<editor-label>', function() {
  let labelEL;
  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/input.html', el => {
      labelEL = el;
      document.body.appendChild(labelEL);
      done();
    });
  });

  afterEach(function ( done ) {
    labelEL.remove();
    done();
  });

  it('can be disabled', function( done ) {
    labelEL.disabled = true;
    expect(labelEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });
});
