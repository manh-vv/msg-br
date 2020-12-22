import { MsgPart } from 'types/MsgPart';

export default function parseMessage(msg: string): MsgPart {
  const msgPart: MsgPart = {
    msg: msg,
    parts: [],
  };

  // analyze by colon
  let tmp = msg;
  const reg = /[:=]/g;
  let idxOfColon = 0;
  while (reg.test(tmp)) {
    if (reg.lastIndex > idxOfColon) {
      idxOfColon = reg.lastIndex - 1;
    }
  }

  if (idxOfColon) {
    msgPart.parts.push({
      type: 'string',
      text: tmp.substring(0, idxOfColon + 1).trim(),
      shouldParse: false,
    });

    tmp = msg.substr(idxOfColon + 1).trim();
  }

  // analyze by number
  let m: RegExpExecArray | null;
  const regNs = '\\d*[,.]?\\d+';
  while (tmp && (m = new RegExp(regNs).exec(tmp))) {
    if (m.index > 0) {
      msgPart.parts.push({
        type: 'string',
        shouldParse: false,
        text: tmp.substring(0, m.index).trim(),
      });
    }
    msgPart.parts.push({
      type: 'number',
      shouldParse: false,
      text: m[0].replace(/[,.]/g, ''),
    });
    tmp = tmp.substr(m.index + m[0].length).trim();
    m = new RegExp(regNs).exec(tmp);
  }

  if (tmp) {
    msgPart.parts.push({
      type: 'string',
      shouldParse: false,
      text: tmp,
    });
  }

  return msgPart;
}
