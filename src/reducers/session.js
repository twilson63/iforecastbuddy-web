import { cond, equals, always, T } from 'ramda'
import { SET_SESSION } from '../constants'

const initialState = {
  access_token: 'uTbdbSj6Cghi2Rhl',
  id_token: 'xyzTBD',
  expires_at: null,
  profile: {
    _id: 'user_captain_hook_1457yde',
    firstName: 'Captain',
    lastName: 'Kirk',
    userPhone: 'NC-1701',
    userEmail: 'Capatain-Kirk@starfleet.galaxy',
    userHomePort: [
      {
        latitude: 32.7437362,
        longitude: -79.91830879
      }
    ],
    userPass: 'pass123e',
    isAdmin: 0,
    photo: '',
    sub: 'sessionXYZ123',
    type: 'user'
  }
}

export default (state = initialState, action) =>
  cond([[equals(SET_SESSION), always(action.payload)], [T, always(state)]])(
    action.type
  )

/*
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
*/
