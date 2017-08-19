import React from 'react'
import FileInput from '../../components/file-input'
import { connect } from 'react-redux'
import { getUser, createUser } from '../../db.js'
import { TextField, Button } from 't63'
import { toUpper, compose, path, head, pathOr } from 'ramda'
import { SET_USER_X } from '../../constants'

class CreateUser extends React.Component {
  componentDidMount() {
    //const id = pathOr(null, ['props', 'match', 'params', 'id'], this)
    // if (id) {
    //   this.props.dispatch(getUser(id))
    const id = ''
  }
  render() {
    const props = this.props
    return (
      <div className="flex flex-column justify-start w-100 avenir pa2">
        <main className="overflow-scroll">
          <h3 className="pa2 f4 f2-ns">
            {props._id ? 'Edit' : 'New'} User
          </h3>
          <form className="ph2" onSubmit={props.submitUser(props.history)}>
            <TextField
              value={props.firstName}
              onChange={props.handleFirstName}
              name="First Name"
            />
            <TextField
              value={props.lastName}
              onChange={props.handleLastName}
              name="Last Name"
              helptxt="Last Name"
            />
            <TextField
              value={props.userPhone}
              onChange={props.handleUserPhone}
              name="Primary Phone"
            />
            <TextField
              value={props.userEmail}
              onChange={props.handleUserEmail}
              name="E-Mail Address"
              placeholder="name@email.com"
            />
            <TextField
              value={props.userHomePort}
              onChange={props.handleUserHomePort}
              name="HomePort"
            />
            <TextField
              value={props.userPass}
              onChange={props.handleUserPass}
              name="Password"
            />
            <TextField
              value={props.userPassConfirm}
              onChange={props.handleUserPassConfirm}
              name="Confirm Password"
            />
            <div className="measure mt2">
              <label className="f6 b db mb2">Photo (optional)</label>
              <div className="flex justify-center pv4">
                <img
                  className="h3  bg-light-blue white w3 ba pa2 br2 mr2 b--dark-blue"
                  src={
                    props.photo
                      ? props.photo
                      : "https://placehold.it/64x64?text='photo'"
                  }
                />
                <FileInput className="pv3 ml2" onChange={props.handlePhoto}>
                  <Button
                    type="button"
                    className="bg-light-blue white ba br2 b--dark-blue k"
                  >
                    Upload
                  </Button>
                </FileInput>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="w-50 bg-light-blue white f-black ba br2 b--dark-blue b-black black">
                Save User
              </Button>
            </div>
          </form>
        </main>
      </div>
    )
  }
}

props => {}

const mapStateToProps = state => {
  return {
    //    _id: state.user._id,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    userPhone: state.user.userPhone,
    userEmail: state.user.userEmail,
    userHomePort: state.user.userHomePort,
    userPass: state.user.userPass,
    userPassConfirm: state.user.userPassConfirm,
    isAdmin: state.user.isAdmin,
    photo: state.user.photo
  }
}

const mapActionsToProps = dispatch => {
  const doDispatch = (field, value) => {
    dispatch({
      type: SET_USER_X + toUpper(field),
      payload: value
    })
  }
  return {
    dispatch,
    submitUser: (_id, history) => e => {
      e.preventDefault()
      dispatch(createUser(history))
      // if (_id) {
      //   dispatch(updateUser(history))
      // } else {
      //   dispatch(createUser(history))
      // }
    },
    handleFirstName: e => doDispatch('FIRSTNAME', e.target.value),
    handleLastName: e => doDispatch('LASTNAME', e.target.value),
    handleUserPhone: e => doDispatch('USERPHONE', e.target.value),
    handleUserEmail: e => doDispatch('USEREMAIL', e.target.value),
    handleUserHomePort: e => doDispatch('USEREPORT', e.target.value),
    handleUserPass: e => doDispatch('SET_USER_PASS', e.target.value),
    handleUserPassConfirm: e =>
      doDispatch('SET_USER_PASSCONFIRM', e.target.value),
    handleAdmin: isAdmin => e => doDispatch('ISADMIN', isAdmin),
    handlePhoto: (e, results) => {
      console.log('handlePhoto results', results)
      const blob = compose(path(['target', 'result']), head, head)(results)
      doDispatch('PHOTO', blob)
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(CreateUser)
