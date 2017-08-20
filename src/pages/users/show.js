import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Button } from 't63'
import { listProfileContacts, getUser, removeUser } from '../../db'
import R from 'ramda'
// import ContactHeader from '../../components/contact-header'
// import MainFooter from '../../components/main-footer'
const { map } = R

class ShowUser extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id
    console.log('userId:', userId)
    this.props.dispatch(getUser(userId))
  }

  render() {
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir">
        <main className="vh-100">
          <h4 className="tc silver f6 pv2 fw5">User</h4>

          <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
            <div className="tc">
              <img
                src={
                  this.props.user.photo
                    ? this.props.user.photo
                    : 'https://placehold.it/100x100?text=No Photo'
                }
                className="br-100 h4 w4 dib ba b--black-05 pa2"
                title="Missing profile photo"
              />
              <h1 className="f3 mb2">
                {this.props.user.firstName} {this.props.user.lastName}
              </h1>
              <h2 className="f5 fw4 gray mt0">
                {this.props.user.userPhone} {this.props.user.primaryEmail}
              </h2>
              <Button
                onClick={this.props.handleRemoveUser(this.props.history)}
                className="w-100 b--red ba br2 bg-light-red"
              >
                Remove User
              </Button>
            </div>
          </article>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapActionsToProps = dispatch => {
  return {
    dispatch,
    handleRemoveUser: history => e => {
      if (window.confirm('Are you sure?')) {
        dispatch(removeUser(history))
      }
    }
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(ShowUser)
