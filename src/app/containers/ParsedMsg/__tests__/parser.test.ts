import parseMessage from '../parser';

describe('test parser', () => {
  it('parse message 0', () => {
    const msg = 'Me mật ong: 0';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Me mật ong:', type: 'string' },
      { shouldParse: false, text: '0', type: 'number' },
    ]);
  });

  it('parse message 1', () => {
    const msg = 'Dâu : 500gr : 50 hộp';
    const msgPart = parseMessage(msg);
    expect(msgPart).toEqual({
      msg,
      parts: [
        { shouldParse: false, text: 'Dâu : 500gr :', type: 'string' },
        { shouldParse: false, text: '50', type: 'number' },
        { shouldParse: false, text: 'hộp', type: 'string' },
      ],
    });
  });

  it('parse message 2', () => {
    const msg = 'Nấm kim châm. 500';
    const msgPart = parseMessage(msg);
    expect(msgPart).toEqual({
      msg,
      parts: [
        { shouldParse: false, text: 'Nấm kim châm.', type: 'string' },
        { shouldParse: false, text: '500', type: 'number' },
      ],
    });
  });

  it('parse message 3', () => {
    const msg = 'Lịch 24/12:';
    const msgPart = parseMessage(msg);
    expect(msgPart).toEqual({
      msg,
      parts: [{ shouldParse: false, text: msg, type: 'string' }],
    });
  });

  it('parse message 4', () => {
    const msg = 'Táo Envy nhỏ 100kg';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Táo Envy nhỏ', type: 'string' },
      { shouldParse: false, text: '100', type: 'number' },
      { shouldParse: false, text: 'kg', type: 'string' },
    ]);
  });

  it('parse message 5', () => {
    const msg = 'Dâu Tây 250=70';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Dâu Tây 250=', type: 'string' },
      { shouldParse: false, text: '70', type: 'number' },
    ]);
  });

  it('parse message 6', () => {
    const msg = 'Blueberry =90';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Blueberry =', type: 'string' },
      { shouldParse: false, text: '90', type: 'number' },
    ]);
  });

  it('parse message 7', () => {
    const msg = 'Me ngọt 450g:40';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Me ngọt 450g:', type: 'string' },
      { shouldParse: false, text: '40', type: 'number' },
    ]);
  });

  it('parse message 8', () => {
    const msg = 'Cam úc Valencia:0 (vì còn tồn 500kg)';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Cam úc Valencia:', type: 'string' },
      { shouldParse: false, text: '0', type: 'number' },
      { shouldParse: false, text: '(vì còn tồn', type: 'string' },
      { shouldParse: false, text: '500', type: 'number' },
      { shouldParse: false, text: 'kg)', type: 'string' },
    ]);
  });

  it('parse message 9', () => {
    const msg = 'Táo Granny smith 1,000.';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Táo Granny smith', type: 'string' },
      { shouldParse: false, text: '1000', type: 'number' },
      { shouldParse: false, text: '.', type: 'string' },
    ]);
  });

  it('parse message 10', () => {
    const msg = 'Táo Mỹ Envy (2)  200.';
    const msgPart = parseMessage(msg);
    expect(msgPart.parts).toEqual([
      { shouldParse: false, text: 'Táo Mỹ Envy (', type: 'string' },
      { shouldParse: false, text: '2', type: 'number' },
      { shouldParse: false, text: ')', type: 'string' },
      { shouldParse: false, text: '200', type: 'number' },
      { shouldParse: false, text: '.', type: 'string' },
    ]);
  });
});
