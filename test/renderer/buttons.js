'use strict';

describe('<editor-buttons>', function() {
  let buttonEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/buttons.html', 'simple', el => {
      buttonEL = el;
      document.body.appendChild(buttonEL);
      done();
    });
  });

  afterEach(function ( done ) {
    buttonEL.remove();
    done();
  });

  it('can be focused', function( done ) {
    Helper.focus(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(true);

    done();
  });

  it('can be blured', function( done ) {
    Helper.focus(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(true);

    Helper.blur(buttonEL);
    expect(buttonEL.hasAttribute('focused')).to.be.eql(false);

    done();
  });

  it('can be click item ', function( done ) {
    let btn = buttonEL.getElementsByTagName('editor-buttons-item')[0];
    btn.addEventListener('click', () => {
      expect(buttonEL.selected).to.be.eql(0);
      expect(btn.hasAttribute('selected')).to.be.eql(true);

      done();
    });
    Helper.click(btn);
  });

  it('can be set selected', function( done ) {
    buttonEL.select(1);
    expect(buttonEL.selected).to.be.eql(1);

    let btn = buttonEL.getElementsByTagName('editor-buttons-item')[1];
    expect(btn.hasAttribute('selected')).to.be.eql(true);

    done();
  });

  it('can be set multi selectedValues', function( done ) {
    buttonEL.select(1);
    expect(buttonEL.selected).to.be.eql(1);

    let btn = buttonEL.getElementsByTagName('editor-buttons-item')[1];
    expect(btn.hasAttribute('selected')).to.be.eql(true);

    done();
  });
});


describe('<editor-buttons multi>', function() {
  let buttonEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/buttons.html', 'multi', el => {
      buttonEL = el;
      document.body.appendChild(buttonEL);
      done();
    });
  });

  afterEach(function ( done ) {
    buttonEL.remove();
    done();
  });

  it('can be set multi selectedValues', function( done ) {
    buttonEL.select(0);
    buttonEL.select(1);
    buttonEL.select(2);

    expect(buttonEL.selectedValues).to.be.eql([0,1,2]);

    let btn0 = buttonEL.getElementsByTagName('editor-buttons-item')[0];
    let btn1 = buttonEL.getElementsByTagName('editor-buttons-item')[1];
    let btn2 = buttonEL.getElementsByTagName('editor-buttons-item')[2];

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
    let btn0 = buttonEL.getElementsByTagName('editor-buttons-item')[0];
    let btn1 = buttonEL.getElementsByTagName('editor-buttons-item')[1];
    let btn2 = buttonEL.getElementsByTagName('editor-buttons-item')[2];

    Helper.click(btn0);
    Helper.click(btn1);

    expect(buttonEL.selectedValues).to.be.eql([0,1]);
    expect(btn0.hasAttribute('selected')).to.be.eql(true);
    expect(btn1.hasAttribute('selected')).to.be.eql(true);
    expect(btn2.hasAttribute('selected')).to.be.eql(false);

    done();
  });
});
