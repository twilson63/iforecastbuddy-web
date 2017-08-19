import { cond, equals, always, T } from 'ramda'
import { SET_SESSION } from '../constants'

const initialState = {
  access_token: 'uTbdbSj6Cghi2Rhl',
  id_token: 'xyzTBD',
  expires_at: null,
  profile: {
    firstName: 'Captain',
    lastName: 'Picard',
    primaryPhone: '84739836565',
    isAdmin: 0,
    primaryEmail: 'picard@starfleet.com',
    photo: '',
    updated_at: '2017-08-16T20:00:29.591Z',
    sub: 'ABC124'
  }
}

export default (state = initialState, action) =>
  cond([[equals(SET_SESSION), always(action.payload)], [T, always(state)]])(
    action.type
  )
