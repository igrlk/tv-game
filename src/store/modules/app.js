export const IS_SOUND_MUTED_TOGGLED = 'app/IS_SOUND_MUTED_TOGGLED'
export const INTRO_WAS_PLAYED = 'app/INTRO_WAS_PLAYED'

const initialState = {
  isSoundMuted: false,
  isIntroWasPlayed: false
}

export function toggleIsSoundMuted() {
  return async dispatch => {
    dispatch({ type: IS_SOUND_MUTED_TOGGLED })
  }
}

export function setIntroWasPlayed(value) {
  return async dispatch => {
    dispatch({ type: INTRO_WAS_PLAYED, value })
  }
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case IS_SOUND_MUTED_TOGGLED:
      return { ...state, isSoundMuted: !state.isSoundMuted }
    case INTRO_WAS_PLAYED:
      return { ...state, isIntroWasPlayed: action.value }

    default:
      return state
  }
}
