describe('<editor-buttons>', function() {
    var buttonEL;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            buttonEL = el;
            done();
        });
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

    it('can be click item ', function( done ) {
        var btn = buttonEL.getElementsByTagName('editor-buttons-item')[0];
        btn.addEventListener('click', function(event) {
            expect(buttonEL.selected).to.be.eql(0);
            expect(btn.hasAttribute('selected')).to.be.eql(true);
            done();
        });
        Tester.click(btn);
    });

    it('can be set selected', function( done ) {
        buttonEL.select(1);
        expect(buttonEL.selected).to.be.eql(1);
        var btn = buttonEL.getElementsByTagName('editor-buttons-item')[1];
        expect(btn.hasAttribute('selected')).to.be.eql(true);
        done();
    });

    it('can be set multi selectedValues', function( done ) {
        buttonEL.select(1);
        expect(buttonEL.selected).to.be.eql(1);
        var btn = buttonEL.getElementsByTagName('editor-buttons-item')[1];
        expect(btn.hasAttribute('selected')).to.be.eql(true);
        done();
    });
});


describe('<editor-buttons multi>', function() {
    var buttonEL;
    beforeEach(function ( done ) {
        fixture('multi', function ( el ) {
            buttonEL = el;
            done();
        });
    });

    it('can be set multi selectedValues', function( done ) {
        buttonEL.select(0);
        buttonEL.select(1);
        buttonEL.select(2);
        expect(buttonEL.selectedValues).to.be.eql([0,1,2]);
        var btn0 = buttonEL.getElementsByTagName('editor-buttons-item')[0];
        var btn1 = buttonEL.getElementsByTagName('editor-buttons-item')[1];
        var btn2 = buttonEL.getElementsByTagName('editor-buttons-item')[2];
        expect(btn0.hasAttribute('selected')).to.be.eql(true);
        expect(btn1.hasAttribute('selected')).to.be.eql(true);
        expect(btn2.hasAttribute('selected')).to.be.eql(true);
        buttonEL.selectedValues = [0,1];
        expect(btn0.hasAttribute('selected')).to.be.eql(true);
        expect(btn1.hasAttribute('selected')).to.be.eql(true);
        expect(btn2.hasAttribute('selected')).to.be.eql(false);
        done();
    });

    it('can be click multi items', function( done ) {
        var btn0 = buttonEL.getElementsByTagName('editor-buttons-item')[0];
        var btn1 = buttonEL.getElementsByTagName('editor-buttons-item')[1];
        var btn2 = buttonEL.getElementsByTagName('editor-buttons-item')[2];
        Tester.click(btn0);
        Tester.click(btn1);
        expect(buttonEL.selectedValues).to.be.eql([0,1]);
        expect(btn0.hasAttribute('selected')).to.be.eql(true);
        expect(btn1.hasAttribute('selected')).to.be.eql(true);
        expect(btn2.hasAttribute('selected')).to.be.eql(false);
        done();
    });
});
