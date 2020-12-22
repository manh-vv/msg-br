import { MsgPart } from './MsgPart';

export interface MsgPartContainer {
  /**
   * max number of message part
   */
  maxCol: number;

  /**
   * max number of message part which contains number value
   */
  maxPosCol: number;

  msgParts: MsgPart[];
}
