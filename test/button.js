Tester.checkLeaks(false);

describe('<editor-button>', function() {
    var buttonEL;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            buttonEL = el;
            done();
        });
    });

    it('can be clicked', function( done ) {
        buttonEL.addEventListener('click', function() {
            done();
        });
        Tester.click(buttonEL);
    });

    it('can be invoked by press space', function( done ) {
        buttonEL.addEventListener('keyup', function(event) {
            if (Editor.KeyCode(event.keyCode) === 'space') {
                done();
            }
        });
        Tester.pressSpace(buttonEL);
    });

    it('can be invoked by press enter', function( done ) {
        buttonEL.addEventListener('keyup', function(event) {
            if (Editor.KeyCode(event.keyCode) === 'enter') {
                done();
            }
        });
        Tester.pressEnter(buttonEL);
    });

    it('can be disabled', function( done ) {
        buttonEL.disabled = true;
        expect(buttonEL.hasAttribute('disabled')).to.be.eql(true);
        done();
    });

    it('can be focused', function( done ) {
        Tester.focus(buttonEL);
        expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
        done();
    });

    it('can be blured', function( done ) {
        Tester.focus(buttonEL);
        expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
        Tester.blur(buttonEL);
        expect(buttonEL.hasAttribute('focused')).to.be.eql(false);
        done();
    });
});
