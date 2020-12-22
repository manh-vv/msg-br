import { MsgPartContainer } from 'types/MsgPartContainer';

/* --- STATE --- */
export interface ParsedMsgState {
  parsedMsg: MsgPartContainer;
}

export type ContainerState = ParsedMsgState;
