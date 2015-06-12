Tester.checkLeaks(false);

describe('<editor-checkbox>', function() {
    var checkboxEl;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            checkboxEl = el;
            done();
        });
    });

    it('can be click', function( done ) {
        Tester.click(checkboxEl);
        expect(checkboxEl.hasAttribute('checked')).to.be.eql(true);
        expect(checkboxEl.value).to.be.eql(true);
        expect(checkboxEl.checked).to.be.eql(true);
        checkboxEl.value = true;
        Tester.click(checkboxEl);
        expect(checkboxEl.hasAttribute('checked')).to.be.eql(false);
        expect(checkboxEl.value).to.be.eql(false);
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

    it('can be press space', function( done ) {
        checkboxEl.value = false;
        Tester.pressSpace(checkboxEl);
        expect(checkboxEl.hasAttribute('checked')).to.be.eql(true);
        expect(checkboxEl.value).to.be.eql(true);
        done();
    });

    it('listen to "on-changed"', function( done ) {
        checkboxEl.addEventListener('changed',function() {
            done();
        });
        checkboxEl.value = false;
        checkboxEl.value = true;
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

    it('shoudl bind value to foo', function(done) {
        checkboxEl.foo = true;
        expect(checkboxEl.$.checkbox.value).to.be.eql(true);
        expect(checkboxEl.$.checkbox.checked).to.be.eql(true);
        expect(checkboxEl.$.checkbox.hasAttribute('checked')).to.be.eql(true);
        checkboxEl.foo = false;
        expect(checkboxEl.$.checkbox.value).to.be.eql(false);
        expect(checkboxEl.$.checkbox.checked).to.be.eql(false);
        expect(checkboxEl.$.checkbox.hasAttribute('checked')).to.be.eql(false);
        done();
    });
});
