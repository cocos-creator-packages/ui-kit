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
});
