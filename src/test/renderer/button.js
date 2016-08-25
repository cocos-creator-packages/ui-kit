'use strict';

describe('<editor-button>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/button.html');

  it('can be clicked', function( done ) {
    let buttonEL = Helper.targetEL;

    buttonEL.addEventListener('click', function() {
      done();
    });
    Helper.click(buttonEL);
  });

  it('can be invoked by press space', function( done ) {
    let buttonEL = Helper.targetEL;

    buttonEL.addEventListener('keyup', function(event) {
      if (Editor.KeyCode(event.keyCode) === 'space') {
        done();
      }
    });
    Helper.pressSpace(buttonEL);
  });

  it('can be invoked by press enter', function( done ) {
    let buttonEL = Helper.targetEL;

    buttonEL.addEventListener('keyup', function(event) {
      if (Editor.KeyCode(event.keyCode) === 'enter') {
        done();
      }
    });
    Helper.pressEnter(buttonEL);
  });

  it('can be disabled', function( done ) {
    let buttonEL = Helper.targetEL;

    buttonEL.disabled = true;
    expect(buttonEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('can be focused', function( done ) {
    let buttonEL = Helper.targetEL;

    Helper.focus(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
    done();
  });

  it('can be blured', function( done ) {
    let buttonEL = Helper.targetEL;

    Helper.focus(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
    Helper.blur(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(false);
    done();
  });
});
