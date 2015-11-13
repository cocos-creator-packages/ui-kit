'use strict';

describe('<editor-buttons>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/buttons.html');

  it('can be focused', function( done ) {
    let buttonsEL = Helper.targetEL;

    Helper.focus(buttonsEL);
    expect(buttonsEL.hasAttribute('focused')).to.be.eql(true);

    done();
  });

  it('can be blured', function( done ) {
    let buttonsEL = Helper.targetEL;

    Helper.focus(buttonsEL);
    expect(buttonsEL.hasAttribute('focused')).to.be.eql(true);

    Helper.blur(buttonsEL);
    expect(buttonsEL.hasAttribute('focused')).to.be.eql(false);

    done();
  });

  it('can be click item ', function( done ) {
    let buttonsEL = Helper.targetEL;

    let btn = buttonsEL.getElementsByTagName('editor-buttons-item')[0];
    btn.addEventListener('click', () => {
      expect(buttonsEL.selected).to.be.eql(0);
      expect(btn.hasAttribute('selected')).to.be.eql(true);

      done();
    });
    Helper.click(btn);
  });

  it('can be set selected', function( done ) {
    let buttonsEL = Helper.targetEL;

    buttonsEL.select(1);
    expect(buttonsEL.selected).to.be.eql(1);

    let btn = buttonsEL.getElementsByTagName('editor-buttons-item')[1];
    expect(btn.hasAttribute('selected')).to.be.eql(true);

    done();
  });

  it('can be set multi selectedValues', function( done ) {
    let buttonsEL = Helper.targetEL;

    buttonsEL.select(1);
    expect(buttonsEL.selected).to.be.eql(1);

    let btn = buttonsEL.getElementsByTagName('editor-buttons-item')[1];
    expect(btn.hasAttribute('selected')).to.be.eql(true);

    done();
  });
});


describe('<editor-buttons multi>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/buttons.html', 'multi');

  it('can be set multi selectedValues', function( done ) {
    let buttonsEL = Helper.targetEL;

    buttonsEL.select(0);
    buttonsEL.select(1);
    buttonsEL.select(2);

    expect(buttonsEL.selectedValues).to.be.eql([0,1,2]);

    let btn0 = buttonsEL.getElementsByTagName('editor-buttons-item')[0];
    let btn1 = buttonsEL.getElementsByTagName('editor-buttons-item')[1];
    let btn2 = buttonsEL.getElementsByTagName('editor-buttons-item')[2];

    expect(btn0.hasAttribute('selected')).to.be.eql(true);
    expect(btn1.hasAttribute('selected')).to.be.eql(true);
    expect(btn2.hasAttribute('selected')).to.be.eql(true);

    buttonsEL.selectedValues = [0,1];

    expect(btn0.hasAttribute('selected')).to.be.eql(true);
    expect(btn1.hasAttribute('selected')).to.be.eql(true);
    expect(btn2.hasAttribute('selected')).to.be.eql(false);

    done();
  });

  it('can be click multi items', function( done ) {
    let buttonsEL = Helper.targetEL;

    let btn0 = buttonsEL.getElementsByTagName('editor-buttons-item')[0];
    let btn1 = buttonsEL.getElementsByTagName('editor-buttons-item')[1];
    let btn2 = buttonsEL.getElementsByTagName('editor-buttons-item')[2];

    Helper.click(btn0);
    Helper.click(btn1);

    expect(buttonsEL.selectedValues).to.be.eql([0,1]);
    expect(btn0.hasAttribute('selected')).to.be.eql(true);
    expect(btn1.hasAttribute('selected')).to.be.eql(true);
    expect(btn2.hasAttribute('selected')).to.be.eql(false);

    done();
  });
});
