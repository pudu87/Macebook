import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute ({ component: Component, currentUserId, ...rest }) {

  return (
    <Route
      {...rest}
      render={() => currentUserId ?
        <Component currentUserId={currentUserId} /> :
        <Redirect to='/login' />
      }
    />
  )
}

export default PrivateRoute
