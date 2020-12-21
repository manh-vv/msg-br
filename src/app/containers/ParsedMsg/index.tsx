/**
 *
 * ParsedMsg
 *
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectParsedMsg } from './selectors';
import { parsedMsgSaga } from './saga';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';

function CopyableView({ id, className = '', text, onCopy = null }) {
  const hint = 'click to copy';
  const [hintText, setHintText] = useState(hint);

  function handleCopy() {
    setHintText('copyied');
    setTimeout(() => {
      setHintText(hint);
    }, 300);
  }
  return (
    <>
      <CopyToClipboard text={text} onCopy={onCopy || handleCopy}>
        <span className={className} data-tip data-for={id} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      </CopyToClipboard>
      <ReactTooltip id={id} place="right" effect="solid">
        <span>{hintText}</span>
      </ReactTooltip>
    </>
  );
}

export function ParsedMsg() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: parsedMsgSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parsedMsg = useSelector(selectParsedMsg);

  return (
    <>
      <div>
        <strong>Parsed message</strong>
        <div className="table-responsive-sm">
          <table className="table table-sm table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Message</th>
                <th scope="col">Left part</th>
                <th scope="col">Value</th>
                <th scope="col">Right part</th>
              </tr>
            </thead>
            <tbody>
              {parsedMsg && parsedMsg.length ? (
                parsedMsg.map((item, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      {item.msg && (
                        <CopyableView
                          id={`${idx}__${item.msg?.replace(/[^\w]+/)}`}
                          text={item.msg}
                        />
                      )}
                    </td>
                    <td>
                      {item.leftPart && (
                        <CopyableView
                          id={`${idx}__${item.leftPart?.replace(/[^\w]+/)}`}
                          text={item.leftPart}
                        />
                      )}
                    </td>
                    <td>
                      {item.v && (
                        <CopyableView
                          id={`${idx}__${item.v?.replace(/[^\w]+/)}`}
                          text={item.value}
                          className="badge badge-success"
                        />
                      )}
                    </td>
                    <td>
                      {item.rightPart && (
                        <CopyableView
                          id={`${idx}__${item.rightPart?.replace(/[^\w]+/)}`}
                          text={item.rightPart}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
