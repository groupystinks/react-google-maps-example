// import parseAndRender from 'helpers/parseAndRender';
//
const LOAD_GROUP = 'word/LOAD_GROUP';
const LOAD_GROUP_SUCCESS = 'word/LOAD_GROUP_SUCCESS';
const LOAD_GROUP_FAIL = 'word/LOAD_GROUP_FAIL';
//
// const LOAD_THREAD = 'word/LOAD_THREAD';
// const LOAD_THREAD_SUCCESS = 'word/LOAD_THREAD_SUCCESS';
// const LOAD_THREAD_FAIL = 'word/LOAD_THREAD_FAIL';
//
// const LOAD_PASSAGE = 'word/LOAD_PASSAGE';
// const LOAD_PASSAGE_SUCCESS = 'word/LOAD_PASSAGE_SUCCESS';
// const LOAD_PASSAGE_FAIL = 'word/LOAD_PASSAGE_FAIL';
//
// const ON_EDIT_PASSAGE = 'word/ON_EDIT_PASSAGE';
// // const ON_EDIT_PASSAGE_SUCCESS = 'word/ON_EDIT_PASSAGE_SUCCESS';
// // const ON_EDIT_PASSAGE_FAIL = 'word/ON_EDIT_PASSAGE_FAIL';
//
const initalState = {
  groupLoaded: false,
  passageLoaded: false,
  threadLoaded: false,
  groups: [],
  passages: {},
  threads: [],
};
//
export default function word(state = initalState, action = {}) {
  switch (action.type) {
    case LOAD_GROUP:
      return {
        ...state,
        groupLoading: true
      };
    case LOAD_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        groupLoaded: true,
        groups: action.result
      };
    case LOAD_GROUP_FAIL:
      return {
        ...state,
        groupLoading: false,
        groupLoaded: false,
        error: action.error
      };
    // case LOAD_THREAD:
    //   return {
    //     ...state,
    //     threadLoading: true
    //   };
    // case LOAD_THREAD_SUCCESS:
    //   return {
    //     ...state,
    //     threadLoading: false,
    //     threadLoaded: true,
    //     threads: action.result
    //   };
    // case LOAD_THREAD_FAIL:
    //   return {
    //     ...state,
    //     threadLoading: false,
    //     threadLoaded: false,
    //     error: action.error
    //   };
    // case LOAD_PASSAGE:
    //   return {
    //     ...state,
    //     passageLoading: true
    //   };
    // case LOAD_PASSAGE_SUCCESS:
    //   const reactBlocksArr = parseAndRender(action.result);
    //   const reactBlockObj = reactBlocksArr.reduce((acc, prev) => {
    //     if (prev && prev.props) {
    //       const sourcepos = prev.props['data-sourcepos'];
    //       acc[sourcepos] = prev;
    //       return acc;
    //     }
    //     return acc;
    //   }, {});
    //
    //   return {
    //     ...state,
    //     passageLoading: false,
    //     passageLoaded: true,
    //     passages: reactBlockObj
    //   };
    // case LOAD_PASSAGE_FAIL:
    //   return {
    //     ...state,
    //     passageLoading: false,
    //     passageLoaded: false,
    //     error: action.error
    //   };
    // case ON_EDIT_PASSAGE:
    //   const {sourcepos, domText} = action.payload;
    //   const reactBlockArr = parseAndRender(domText);
    //   const passages = {
    //     ...state.passages,
    //     [sourcepos]: reactBlockArr
    //   };
    //   return {
    //     ...state,
    //     passages
    //   };
    default:
      return state;
  }
}
//
// export function isGroupLoaded(globalState) {
//   return globalState.word && globalState.word.groupLoaded;
// }
//
// export function isThreadLoaded(globalState) {
//   return globalState.word && globalState.word.threadLoaded;
// }
//
// export function isPassageLoaded(globalState) {
//   return globalState.word && globalState.word.passageLoaded;
// }
//

export function loadGroup() {
  return {
    types: [LOAD_GROUP, LOAD_GROUP_SUCCESS, LOAD_GROUP_FAIL],
    promise: (client) => client.firebaseApi.get('groups'),
  };
}

// export function loadThread(groupID) {
//   return {
//     types: [LOAD_THREAD, LOAD_THREAD_SUCCESS, LOAD_THREAD_FAIL],
//     promise: (client) => client.firebaseApi.get('threads/' + groupID + '/threadList'),
//   };
// }
//
// /* githubapi deprecated, now use firebaseApi*/
// // export function loadPassage(completeURL) {
// //   return {
// //     types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
// //     promise: (client) => client.firebaseApi.get(completeURL, {
// //       options: {
// //         isCompleteURL: true
// //       }
// //     }),
// //   };
// // }
//
// export function loadPassage(ids) {
//   return {
//     types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
//     promise: (client) => client.firebaseApi.get(`passages/${ids.groupID}/${ids.threadID}`),
//   };
// }
//
// /* githubapi deprecated, now use firebaseApi*/
// // export function initPassage(ids) {
// //   // for github
// //   const completeURL = 'https://raw.githubusercontent.com/groupystinks/skrik-view/master/data/'
// //     + ids.groupID + '/' + ids.threadID;
// //   return {
// //     types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
// //     promise: (client) => client.githubApi.get(completeURL, {
// //       options: {
// //         isCompleteURL: true
// //       }
// //     }),
// //   };
// // }
//
// export function initPassage(ids) {
//   return {
//     types: [LOAD_PASSAGE, LOAD_PASSAGE_SUCCESS, LOAD_PASSAGE_FAIL],
//     promise: (client) => client.firebaseApi.get(`passages/${ids.groupID}/${ids.threadID}`),
//   };
// }
//
// export function onEditPassage(sourcepos, domText) {
//   return {
//     type: ON_EDIT_PASSAGE,
//     payload: {
//       sourcepos,
//       domText
//     }
//   };
// }
