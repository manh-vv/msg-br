import { put, select, takeLatest } from 'redux-saga/effects';
import { MsgPartContainer } from 'types/MsgPartContainer';
import { selectOriginMsg } from '../OriginalMsg/selectors';
import { originalMsgActions } from '../OriginalMsg/slice';
import parseMessage from './parser';
import { parsedMsgActions } from './slice';

export function* parseMsg() {
  const msg = yield select(selectOriginMsg);

  const msgPartContainer: MsgPartContainer = {
    msgParts: [],
    maxCol: 0,
    maxPosCol: 0,
  };

  msgPartContainer.msgParts = msg
    .split('\n')
    .filter(l => l)
    .map(l => {
      const msgPart = parseMessage(l);
      msgPart.posVParts = msgPart.parts.filter(p => p.type === 'number');

      if (msgPart.parts.length > msgPartContainer.maxCol) {
        msgPartContainer.maxCol = msgPart.parts.length;
      }

      if (msgPart.posVParts.length > msgPartContainer.maxPosCol) {
        msgPartContainer.maxPosCol = msgPart.posVParts.length;
      }

      return msgPart;
    });

  yield put(parsedMsgActions.parsedMsg(msgPartContainer));
}

export function* parsedMsgSaga() {
  yield takeLatest(originalMsgActions.updateOriginMsg.type, parseMsg);
}
