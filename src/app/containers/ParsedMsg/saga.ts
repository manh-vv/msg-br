import { put, select, takeLatest } from 'redux-saga/effects';
import { selectOriginMsg } from '../OriginalMsg/selectors';
import { originalMsgActions } from '../OriginalMsg/slice';
import { parsedMsgActions } from './slice';

export function* parseMsg() {
  const msg = yield select(selectOriginMsg);

  const payload = msg
    .split('\n')
    .filter(l => l)
    .map(l => {
      const rs: any = {
        msg: l,
      };

      const m = /\d+/g.exec(l);

      if (m) {
        rs.index = m['index'];
        rs.groups = m['groups'];
        rs.v = m[0];
        rs.value = +rs.v;
        rs.leftPart = l.substring(0, rs.index - 1).trim();
        rs.rightPart = l.substring(rs.index + rs.v.length, l.length).trim();
      }

      return rs;
    });

  yield put(parsedMsgActions.parsedMsg(payload));
}

export function* parsedMsgSaga() {
  yield takeLatest(originalMsgActions.updateOriginMsg.type, parseMsg);
}
