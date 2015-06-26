describe('<editor-select>', function() {
    var selectEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            selectEl = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        selectEl.disabled = true;
        expect(selectEl.hasAttribute('disabled')).to.be.eql(true);
        done();
    });

    it('should be set placeholder', function( done ) {
        selectEl.placeholder = 'placeholder';
        expect(selectEl.$.text.classList.contains('placeholder')).to.be.eql(true);
        done();
    });

    it('can be click', function( done ) {
        Tester.click(selectEl);
        expect(selectEl.$.menu.hidden).to.be.eql(false);
        done();
    });
});


describe('<editor-select> with items', function() {
    var scopeEL;
    beforeEach(function ( done ) {
        fixture('items', function ( el ) {
            scopeEL = el;
            done();
        });
    });

    it('can be set value', function( done ) {
        scopeEL.value = '1';
        Tester.click(scopeEL);

        var options = Polymer.dom(scopeEL).children;
        for ( var i = 0; i < options.length; ++i ) {
            if (options[i].getAttribute('selected') !== null && options[i].value === '1') {
                done();
            }
        }
    });
});
