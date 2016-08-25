'use strict';

describe('<editor-checkbox>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/checkbox.html', 'simple');

  it('can be clicked', function ( done ) {
    let checkboxEL = Helper.targetEL;

    Helper.click(checkboxEL);
    expect(checkboxEL.hasAttribute('checked')).to.be.eql(true);
    expect(checkboxEL.checked).to.be.eql(true);

    checkboxEL.checked = true;
    Helper.click(checkboxEL);
    expect(checkboxEL.hasAttribute('checked')).to.be.eql(false);
    expect(checkboxEL.checked).to.be.eql(false);

    done();
  });

  it('can be disabled', function ( done ) {
    let checkboxEL = Helper.targetEL;

    checkboxEL.disabled = true;
    expect(checkboxEL.hasAttribute('disabled')).to.be.eql(true);

    checkboxEL.disabled = false;
    expect(checkboxEL.hasAttribute('disabled')).to.be.eql(false);

    done();
  });

  it('can be invoked by press space', function ( done ) {
    let checkboxEL = Helper.targetEL;

    checkboxEL.checked = false;
    Helper.pressSpace(checkboxEL);
    setTimeout(function() {
      expect(checkboxEL.hasAttribute('checked')).to.be.eql(true);
      expect(checkboxEL.checked).to.be.eql(true);

      done();
    },10);
  });

  it('can be invoked by press enter', function ( done ) {
    let checkboxEL = Helper.targetEL;

    checkboxEL.checked = false;
    Helper.pressEnter(checkboxEL);
    setTimeout(() => {
      expect(checkboxEL.hasAttribute('checked')).to.be.eql(true);
      expect(checkboxEL.checked).to.be.eql(true);

      done();
    },10);

  });

  it('should fire changed event when value changed', function( done ) {
    let checkboxEL = Helper.targetEL;

    checkboxEL.addEventListener('checked-changed', () => {
      done();
    });
    checkboxEL.checked = false;
    checkboxEL.checked = true;
  });
});


describe('<editor-checkbox value="{{foo}}">', function () {
  Helper.runElement('packages://ui-kit/test/fixtures/checkbox.html', 'bind');

  it('should bind value to foo', function(done) {
    let checkboxEL = Helper.targetEL;

    checkboxEL.foo = true;
    expect(checkboxEL.$.checkbox.checked).to.be.eql(true);
    expect(checkboxEL.$.checkbox.hasAttribute('checked')).to.be.eql(true);

    checkboxEL.foo = false;
    expect(checkboxEL.$.checkbox.checked).to.be.eql(false);
    expect(checkboxEL.$.checkbox.hasAttribute('checked')).to.be.eql(false);

    done();
  });
});
