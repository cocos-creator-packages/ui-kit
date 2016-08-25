'use strict';

describe('<editor-select>', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/select.html', 'simple');

  it('should be disabled', function( done ) {
    let selectEL = Helper.targetEL;

    selectEL.disabled = true;
    expect(selectEL.hasAttribute('disabled')).to.be.eql(true);
    done();
  });

  it('should be set placeholder', function( done ) {
    let selectEL = Helper.targetEL;

    selectEL.placeholder = 'placeholder';
    expect(selectEL.$.text.classList.contains('placeholder')).to.be.eql(true);
    done();
  });

  it('can be click', function( done ) {
    let selectEL = Helper.targetEL;

    Helper.click(selectEL);
    expect(selectEL.$.menu.hidden).to.be.eql(false);
    done();
  });
});


describe('<editor-select> with items', function() {
  Helper.runElement('packages://ui-kit/test/fixtures/select.html', 'items');

  it('can be set value', function( done ) {
    let selectEL = Helper.targetEL;

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
    let selectEL = Helper.targetEL;

    selectEL.value = '2';
    expect(selectEL.$.text.innerHTML).to.be.eql('text2');
    done();
  });
});
