//URL /
//container component
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'
import { handleInitialData } from '../actions/shared.js'

import Login from '../components/Login'
import Nav from '../components/Nav'
import QuestionsList from './questionsList/QuestionsList'
import QuestionPage from './questionsDetailsPage/QuestionPage'
import AddForm from '../components/AddForm'
import Leaderboard from './leaderboard/Leaderboard'
import LoadingBar from 'react-redux-loading'
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faHome, faPlus, faList } from '@fortawesome/free-solid-svg-icons'
library.add(faBars, faHome, faPlus, faList)

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loading, authorUser } = this.props
      return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="App">
              <LoadingBar />
                { !loading &&
                    (  authorUser === null ?
                        <Login />
                            :
                        <Fragment>
                            <header>
                                <Nav/>
                            </header>
                            <main>
                                <Route path='/add' exact component={AddForm} />
                                <Route exact path='/' component={QuestionsList} />
                                <Route path='/questions/:question_id' component={QuestionPage} />
                                <Route path='/leaderboard' component={Leaderboard} />
                            </main>
                        </Fragment>
                    )
                }
          </div>
      </BrowserRouter>
      )
  }
}
function mapStateToProps ({ users, loadingBar, authorUser }) {
    return {
        loading: loadingBar.default === 1 ,
        users,
        authorUser
    }
}

export default connect(mapStateToProps)(App)



