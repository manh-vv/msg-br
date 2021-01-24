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

function CopyableView({ id, text, type, onCopy = null, isPos }) {
  const hint = 'click to copy';
  const [hintText, setHintText] = useState(hint);

  function handleCopy() {
    setHintText('copyied');
    setTimeout(() => {
      setHintText(hint);
    }, 300);
  }

  let className: string = '';
  if (isPos) {
    className = 'text-info';
  } else if (type === 'number') {
    className = 'text-success';
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
          <table className="table table-sm table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">message</th>
                {new Array(parsedMsg.maxPosCol).fill(null).map((_, i) => (
                  <th scope="col" key={i}>{`possible ${i + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedMsg.msgParts.length ? (
                parsedMsg.msgParts.map((item, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      {item.parts.map((p, i) => (
                        <span key={i}>
                          <CopyableView
                            id={`${idx}_${i}_${p.text.replace(/[^\w]+/g, '')}`}
                            text={p.text}
                            type={p.type}
                            isPos={p.isPos}
                          />{' '}
                        </span>
                      ))}
                    </td>
                    {item.posVParts &&
                      item.posVParts.map((p, i) => (
                        <td key={i}>
                          <CopyableView
                            id={`${idx}_${i}_${p.text.replace(/[^\w]+/g, '')}`}
                            text={p.text}
                            type={p.type}
                            isPos={p.isPos}
                          />
                        </td>
                      ))}

                    {new Array(parsedMsg.maxPosCol - (item.posVParts?.length || 0))
                      .fill(null)
                      .map((_, i) => (
                        <td key={i}></td>
                      ))}
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
