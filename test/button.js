Tester.checkLeaks(false);

describe('<editor-button>', function() {
    var buttonEL;
    beforeEach(function ( done ) {
        Editor.sendToCore('console:clear');
        buttonEL = fixture('widget');
        done();
    });

    it('can be click', function( done ) {
        buttonEL.addEventListener('click', function() {
            done();
        });
        Tester.click(buttonEL);
    });

    it('can be space', function( done ) {
        buttonEL.addEventListener('keyup', function(event) {
            if (event.keyCode === "space") {
                done();
            }
        });
        Tester.pressSpace(buttonEL);
    });

    it('can be enter', function( done ) {
        buttonEL.addEventListener('keyup', function(event) {
            if (event.keyCode === "enter") {
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

    it('can be blur', function( done ) {
        Tester.focus(buttonEL);
        expect(buttonEL.hasAttribute('focused')).to.be.eql(true);
        Tester.blur(buttonEL);
        expect(buttonEL.hasAttribute('focused')).to.be.eql(false);
        done();
    });
});
