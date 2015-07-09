var Async = require('async');

describe('<editor-unit-input>', function() {
    var unit;
    beforeEach(function ( done ) {
        fixture('widget', function ( el ) {
            unit = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        unit.disabled = true;
        expect(unit.hasAttribute('disabled')).to.be.eql(true);
        done();
    });

    it('should be invalid', function( done ) {
        unit.invalid = true;
        expect(unit.hasAttribute('invalid')).to.be.eql(true);
        done();
    });

    it('should be focused', function( done ) {
        Tester.focus(unit);
        expect(unit.hasAttribute('focused')).to.be.eql(true);
        done();
    });

    it('should be blur', function( done ) {
        Tester.focus(unit);
        expect(unit.hasAttribute('focused')).to.be.eql(true);
        Tester.blur(unit);
        expect(unit.hasAttribute('focused')).to.be.eql(false);
        done();
    });

    it('should set el.$.input.value through el.value', function( done ) {
        unit.value = 123;
        expect(unit.inputValue).to.be.eql(123);
        done();
    });


    it('can be cancel value', function( done ) {
        Tester.focus(unit);
        unit.inputValue = 123;
        unit.cancel();
        expect(unit.value).to.be.eql(0);
        done();
    });

    it('can be confirm value', function( done ) {
        Tester.focus(unit);
        unit.inputValue = 123;
        unit.confirm();
        expect(unit.value).to.be.eql(123);
        done();
    });

    it('can be invoked by press "up" and "down"', function( done ) {
        unit.value = 123;
        Tester.keydown(unit.$.input,'up');
        unit.confirm();
        expect(unit.inputValue).to.be.eql(124);
        Tester.keydown(unit.$.input,'down');
        unit.confirm();
        expect(unit.inputValue).to.be.eql(123);
        done();
    });

    it('can be click "up" & "down" btn', function( done ) {
        unit.value = 123;
        Tester.click(unit.getElementsByClassName('btn')[0]);
        unit.confirm();
        expect(unit.inputValue).to.be.eql(124);
        Tester.click(unit.getElementsByClassName('btn')[1]);
        unit.confirm();
        expect(unit.inputValue).to.be.eql(123);
        done();
    });

    it('should be focused after click increase or decrease button', function( done ) {
        Tester.focus(unit.getElementsByClassName('btn')[0]);
        Tester.click(unit.getElementsByClassName('btn')[0],0,0,0);
        Tester.click(unit.getElementsByClassName('btn')[0],0,0,0);
        Tester.click(unit.getElementsByClassName('btn')[1],0,0,0);
        setTimeout(function () {
            expect(unit.hasAttribute('focused')).to.be.eql(true);
            done();
        },10);
    });

    it('it should change the value after click increase or decrease button', function( done ) {
        Tester.click(unit.getElementsByClassName('btn')[0],0,0,0);
        Tester.click(unit.getElementsByClassName('btn')[0],0,0,0);
        Tester.click(unit.getElementsByClassName('btn')[1],0,0,0);
        setTimeout(function () {
            expect(unit.value).to.be.eql(1);
            done();
        },10);
    });

    it('the input should show "0" after click decrease button', function( done ) {
        unit.value = 1;
        Tester.click(unit.getElementsByClassName('btn')[1],0,0,0);
        setTimeout(function () {
            expect(unit.$.input.bindValue).to.be.eql('0');
            done();
        },10);
    });

    it('the input should show "0" after click increase button', function( done ) {
        unit.value = -1;
        Tester.click(unit.getElementsByClassName('btn')[0],0,0,0);
        setTimeout(function () {
            expect(unit.$.input.bindValue).to.be.eql('0');
            done();
        },10);
    });

    it('should not change the value after _stepUp or _stepDown invoked', function( done ) {
        unit.value = 123;
        unit._stepUp();
        expect(unit.value).to.be.eql(123);
        unit._stepDown();
        expect(unit.value).to.be.eql(123);
        done();
    });

    it('should be focused for unit-input when increase or decrease button focused.',function ( done ) {
        Async.series({
            increase: function (cb) {
                Tester.focus(unit.getElementsByClassName('btn')[0]);
                expect(unit.focused).to.be.eql(true);
                Tester.blur(unit.getElementsByClassName('btn')[0]);

                setTimeout(function () {
                    expect(unit.focused).to.be.eql(false);
                    cb(null,true);
                },10);
            },
            decrease: function (cb) {
                Tester.focus(unit.getElementsByClassName('btn')[1]);
                expect(unit.focused).to.be.eql(true);
                Tester.blur(unit.getElementsByClassName('btn')[1]);

                setTimeout(function () {
                    expect(unit.focused).to.be.eql(false);
                    cb(null,true);
                },10);
            },
            input: function (cb) {
                Tester.focus(unit.$.input);
                expect(unit.focused).to.be.eql(true);
                Tester.blur(unit.$.input);

                setTimeout(function () {
                    expect(unit.focused).to.be.eql(false);
                    cb(null,true);
                },10);
            },
        },function (err,result) {
            done();
        });
    });

});


describe('<editor-unit-input value="{{foo}}">', function() {
    var scopeEL;
    beforeEach(function ( done ) {
        fixture('bind-to-object', function ( el ) {
            scopeEL = el;
            done();
        });
    });

    it('shoudl bind value to foo', function() {
        scopeEL.foo = 1;
        expect(scopeEL.$.input.value).to.be.eql(1);
        expect(scopeEL.$.input.inputValue).to.be.eql(1);
        expect(scopeEL.$.input.$.input.value).to.be.eql('1');
    });

    it('shoudl work when binding value to undefined', function() {
        scopeEL.foo = undefined;
        expect(scopeEL.$.input.value).to.be.eql(0);
    });
});

describe('<editor-unit-input value="1">', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('value', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should init value with number 1', function( done ) {
        expect(inputEl.value).to.be.eql(1);
        expect(inputEl.inputValue).to.be.eql(1);
        expect(inputEl.$.input.value).to.be.eql('1');
        done();
    });
});


describe('<editor-unit-input disabled>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('disabled', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should be disabled', function( done ) {
        expect(inputEl.disabled).to.be.eql(true);
        done();
    });
});


describe('<editor-unit-input invalid>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('invalid', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should be invalid', function( done ) {
        expect(inputEl.invalid).to.be.eql(true);
        done();
    });
});

describe('<editor-unit-input min="5" max="10" value="0">', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('limit', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('can reset the initial value', function( done ) {
        expect(inputEl.value).to.be.eql(5);
        done();
    });

    it('can limit the value if it less than min', function( done ) {
        inputEl.value = 2;
        expect(inputEl.value).to.be.eql(5);
        done();
    });

    it('can limit the value if it large than max', function( done ) {
        inputEl.value = 20;
        expect(inputEl.value).to.be.eql(10);
        done();
    });
});

describe('<editor-unit-input precision>', function() {
    var inputEl;
    beforeEach(function ( done ) {
        fixture('precision', function ( el ) {
            inputEl = el;
            done();
        });
    });

    it('should be invalid', function( done ) {
        inputEl.$.input.bindValue = '14.12';
        inputEl.inputValue = 14.123456;
        expect(inputEl.inputValue).to.be.eql(14.123456);
        expect(inputEl.$.input.bindValue).to.be.eql('14.12');
        done();
    });
});
