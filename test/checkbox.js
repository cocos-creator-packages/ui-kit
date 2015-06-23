describe('<editor-checkbox>', function() {
    var checkboxEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            checkboxEl = el;
            done();
        });
    });

    it('can be clicked', function( done ) {
        Tester.click(checkboxEl);
        expect(checkboxEl.hasAttribute('checked')).to.be.eql(true);
        expect(checkboxEl.checked).to.be.eql(true);
        checkboxEl.checked = true;
        Tester.click(checkboxEl);
        expect(checkboxEl.hasAttribute('checked')).to.be.eql(false);
        expect(checkboxEl.checked).to.be.eql(false);
        done();
    });

    it('can be disabled', function( done ) {
        checkboxEl.disabled = true;
        expect(checkboxEl.hasAttribute('disabled')).to.be.eql(true);
        checkboxEl.disabled = false;
        expect(checkboxEl.hasAttribute('disabled')).to.be.eql(false);
        done();
    });

    it('can be invoked by press space', function( done ) {
        checkboxEl.checked = false;
        Tester.pressSpace(checkboxEl);
        setTimeout(function() {
            expect(checkboxEl.hasAttribute('checked')).to.be.eql(true);
            expect(checkboxEl.checked).to.be.eql(true);
            done();
        },10);
    });

    it('can be invoked by press enter', function( done ) {
        checkboxEl.checked = false;
        Tester.pressEnter(checkboxEl);
        setTimeout(function() {
            expect(checkboxEl.hasAttribute('checked')).to.be.eql(true);
            expect(checkboxEl.checked).to.be.eql(true);
            done();
        },10);

    });

    it('should fire changed event when value changed', function( done ) {
        checkboxEl.addEventListener('checked-changed',function() {
            done();
        });
        checkboxEl.checked = false;
        checkboxEl.checked = true;
    });
});


describe('<editor-checkbox value="{{foo}}">', function() {
    var checkboxEl;
    beforeEach(function ( done ) {
        fixture('bind-to-object', function ( el ) {
            checkboxEl = el;
            done();
        });
    });

    it('should bind value to foo', function(done) {
        checkboxEl.foo = true;
        expect(checkboxEl.$.checkbox.checked).to.be.eql(true);
        expect(checkboxEl.$.checkbox.hasAttribute('checked')).to.be.eql(true);
        checkboxEl.foo = false;
        expect(checkboxEl.$.checkbox.checked).to.be.eql(false);
        expect(checkboxEl.$.checkbox.hasAttribute('checked')).to.be.eql(false);
        done();
    });
});
