export interface Part {
  type?: string;
  text: string;
  shouldParse: boolean;
}

export interface MsgPart {
  msg: string;
  parts: Part[];

  /**
   * possible value parts
   */
  posVParts?: Part[];
}
