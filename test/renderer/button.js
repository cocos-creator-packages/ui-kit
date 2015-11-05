'use strict';

describe('<editor-button>', function() {
  let buttonEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/button.html', el => {
      buttonEL = el;
      document.body.appendChild(buttonEL);
      done();
    });
  });

  afterEach(function ( done ) {
    buttonEL.remove();
    done();
  });

  it('can be clicked', function( done ) {
    buttonEL.addEventListener('click', function() {
      done();
    });
    Helper.click(buttonEL);
  });

  it('can be invoked by press space', function( done ) {
    buttonEL.addEventListener('keyup', function(event) {
      if (Editor.KeyCode(event.keyCode) === 'space') {
        done();
      }
    });
    Helper.pressSpace(buttonEL);
  });

  it('can be invoked by press enter', function( done ) {
    buttonEL.addEventListener('keyup', function(event) {
      if (Editor.KeyCode(event.keyCode) === 'enter') {
        done();
      }
    });
    Helper.pressEnter(buttonEL);
  });

  it('can be disabled', function( done ) {
    buttonEL.disabled = true;
    expect(buttonEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('can be focused', function( done ) {
    Helper.focus(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
    done();
  });

  it('can be blured', function( done ) {
    Helper.focus(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
    Helper.blur(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(false);
    done();
  });
});
