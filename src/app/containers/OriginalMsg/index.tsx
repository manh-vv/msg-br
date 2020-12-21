/**
 *
 * OriginalMsg
 *
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, originalMsgActions } from './slice';
import { selectOriginMsg } from './selectors';
import { originalMsgSaga } from './saga';

interface Props {}

export function OriginalMsg(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: originalMsgSaga });

  const originMsg = useSelector(selectOriginMsg);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <strong>Original message</strong>

        <form>
          <div className="form-group">
            <label htmlFor="id-origin-msg">Input origin message</label>
            <TextareaAutosize
              className="form-control"
              id="id-origin-msg"
              minRows={3}
              aria-describedby="aria-origin-message"
              value={originMsg}
              onChange={e => {
                dispatch(originalMsgActions.updateOriginMsg(e.target.value));
              }}
            />
            <small id="aria-origin-message" className="form-text text-muted">
              Copy and paste origin message here
            </small>
          </div>
        </form>
      </div>
    </>
  );
}
