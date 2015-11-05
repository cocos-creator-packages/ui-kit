'use strict';

describe('<editor-select>', function() {
  let selectEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/select.html', 'simple', el => {
      selectEL = el;
      document.body.appendChild(selectEL);
      done();
    });
  });

  afterEach(function ( done ) {
    selectEL.remove();
    done();
  });

  it('should be disabled', function( done ) {
    selectEL.disabled = true;
    expect(selectEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('should be set placeholder', function( done ) {
    selectEL.placeholder = 'placeholder';
    expect(selectEL.$.text.classList.contains('placeholder')).to.be.eql(true);
    done();
  });

  it('can be click', function( done ) {
    Helper.click(selectEL);
    expect(selectEL.$.menu.hidden).to.be.eql(false);
    done();
  });
});


describe('<editor-select> with items', function() {
  let selectEL;

  beforeEach(function ( done ) {
    Helper.createFrom('packages://ui-kit/test/fixtures/select.html', 'items', el => {
      selectEL = el;
      document.body.appendChild(selectEL);
      done();
    });
  });

  afterEach(function ( done ) {
    selectEL.remove();
    done();
  });

  it('can be set value', function( done ) {
    selectEL.value = '1';
    Helper.click(selectEL);

    let options = Polymer.dom(selectEL).children;
    for ( let i = 0; i < options.length; ++i ) {
      if (options[i].getAttribute('selected') !== null && options[i].value === '1') {
        done();
      }
    }
  });

  it('should be show text', function( done ) {
    selectEL.value = '2';
    expect(selectEL.$.text.innerHTML).to.be.eql('text2');
    done();
  });
});
