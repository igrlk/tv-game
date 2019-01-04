export const IS_SOUND_MUTED_TOGGLED = 'app/IS_SOUND_MUTED_TOGGLED'

const initialState = {
  isSoundMuted: false
}

export function toggleIsSoundMuted() {
  return dispatch => {
    dispatch({ type: IS_SOUND_MUTED_TOGGLED })
  }
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case IS_SOUND_MUTED_TOGGLED:
      return { ...state, isSoundMuted: !state.isSoundMuted }

    default:
      return state
  }
}
