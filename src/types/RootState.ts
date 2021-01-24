import { OriginalMsgState } from 'app/containers/OriginalMsg/types';
import { ParsedMsgState } from 'app/containers/ParsedMsg/types';
import { NavbarState } from 'app/containers/Navbar/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  originalMsg?: OriginalMsgState;
  parsedMsg?: ParsedMsgState;
  navbar?: NavbarState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
