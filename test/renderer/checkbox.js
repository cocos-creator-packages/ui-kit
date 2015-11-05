'use strict';

describe('<editor-checkbox>', function() {
  let checkboxEL;
  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/checkbox.html', 'simple', el => {
      checkboxEL = el;
      document.body.appendChild(checkboxEL);
      done();
    });
  });

  afterEach(function ( done ) {
    checkboxEL.remove();
    done();
  });

  it('can be clicked', function ( done ) {
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
    checkboxEL.disabled = true;
    expect(checkboxEL.hasAttribute('disabled')).to.be.eql(true);

    checkboxEL.disabled = false;
    expect(checkboxEL.hasAttribute('disabled')).to.be.eql(false);

    done();
  });

  it('can be invoked by press space', function ( done ) {
    checkboxEL.checked = false;
    Helper.pressSpace(checkboxEL);
    setTimeout(function() {
      expect(checkboxEL.hasAttribute('checked')).to.be.eql(true);
      expect(checkboxEL.checked).to.be.eql(true);

      done();
    },10);
  });

  it('can be invoked by press enter', function ( done ) {
    checkboxEL.checked = false;
    Helper.pressEnter(checkboxEL);
    setTimeout(() => {
      expect(checkboxEL.hasAttribute('checked')).to.be.eql(true);
      expect(checkboxEL.checked).to.be.eql(true);

      done();
    },10);

  });

  it('should fire changed event when value changed', function( done ) {
    checkboxEL.addEventListener('checked-changed', () => {
      done();
    });
    checkboxEL.checked = false;
    checkboxEL.checked = true;
  });
});


describe('<editor-checkbox value="{{foo}}">', function () {
  let checkboxEL;
  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/checkbox.html', 'bind', el => {
      checkboxEL = el;
      document.body.appendChild(checkboxEL);
      done();
    });
  });

  afterEach(function ( done ) {
    checkboxEL.remove();
    done();
  });

  it('should bind value to foo', function(done) {
    checkboxEL.foo = true;
    expect(checkboxEL.$.checkbox.checked).to.be.eql(true);
    expect(checkboxEL.$.checkbox.hasAttribute('checked')).to.be.eql(true);

    checkboxEL.foo = false;
    expect(checkboxEL.$.checkbox.checked).to.be.eql(false);
    expect(checkboxEL.$.checkbox.hasAttribute('checked')).to.be.eql(false);

    done();
  });
});
