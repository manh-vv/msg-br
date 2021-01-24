import { PayloadAction } from '@reduxjs/toolkit';
import { put, select, takeLatest } from 'redux-saga/effects';
import { selectOriginMsg } from '../OriginalMsg/selectors';
import { originalMsgActions } from '../OriginalMsg/slice';
import parseMessage from './parser';
import { parsedMsgActions } from './slice';
import { ToWords } from 'to-words';
import { MsgPart } from 'types/MsgPart';

export function* parseMsg() {
  const msg = yield select(selectOriginMsg);

  const lines = msg.split('\n').filter(l => l);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\d*[,.]?\d+$/.test(line)) {
      yield put(
        parsedMsgActions.spellNumber({
          line,
          idx: i,
        }),
      );
    } else {
      yield put(
        parsedMsgActions.parseMessage({
          line,
          idx: i,
        }),
      );
    }
  }
}

export function* handleParseMessage(action: PayloadAction<{ line: string; idx: number }>) {
  const msgPart = parseMessage(action.payload.line);
  yield put(
    parsedMsgActions.addMsgPart({
      msgPart,
      idx: action.payload.idx,
    }),
  );
}

const toWords = new ToWords();

function writtenNumber(n) {
  try {
    return toWords.convert(n);
  } catch (e) {
    return e + '';
  }
}

export function* handleSpellNumber(action: PayloadAction<{ line: string; idx: number }>) {
  const {
    payload: { line, idx },
  } = action;

  const msgPart: MsgPart = {
    msg: line,
    parts: [
      {
        shouldParse: false,
        text: line,
        type: 'string',
        isPos: false,
      },
      {
        shouldParse: false,
        text: writtenNumber(+line),
        type: 'string',
        isPos: true,
      },
    ],
  };

  yield put(
    parsedMsgActions.addMsgPart({
      msgPart,
      idx,
    }),
  );
}

export function* parsedMsgSaga() {
  yield takeLatest(originalMsgActions.updateOriginMsg.type, parseMsg);
  yield takeLatest(parsedMsgActions.parseMessage.type, handleParseMessage);
  yield takeLatest(parsedMsgActions.spellNumber.type, handleSpellNumber);
}
