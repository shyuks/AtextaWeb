import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles';
import { FlatButton } from 'material-ui'
import Navbar from '../components/Navbar'
import MessageList from './MessageList'
import GroupList from './GroupList'
import { connect } from 'react-redux'
import { getUserInfo } from '../actions/atexta_actions'
import axios from 'axios';

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showMessageList: true,
			showGroupList: false,
			finished: false
		}
		this.componentWillMount = this.componentWillMount.bind(this)
		this.renderMessageList = this.renderMessageList.bind(this)
		this.renderGroupList = this.renderGroupList.bind(this)
	}

	componentWillMount() {
		var token = this.props.auth.getAccessToken()
		  axios.post('/auth/login', {token})
			.then(result => {
				axios.defaults.headers.common['Authorization'] = result.data.token;
				this.props.getUserInfo(result.data.userId, result.data.userCommands, result.data.userGroups);
				this.setState({finished: true})
			}).catch(error => {
				console.log(error);
			})
	}

	renderMessageList() {
		this.setState({
			showMessageList: true,
			showGroupList: false
		})
	}

	renderGroupList() {
		this.setState({
			showGroupList: true,
			showMessageList: false
		})
	}

	render() {
		return this.state.finished ? 
		(
			<div>
				<MuiThemeProvider>
					<div>
						<Navbar	renderGroupList={this.renderGroupList} renderMessageList={this.renderMessageList} logout={this.props.auth.logout}/>
						 {this.state.showMessageList ? <MessageList /> : 
							this.state.showGroupList ? <GroupList /> :
							<div></div>
						 }
					</div>
				</MuiThemeProvider>
      </div>
		)
		:
		(
			<div>have not gotten id yet</div>
		)

	}
}

function mapStateToProps({atexta}) {
	return {userId: atexta.userId };
}

export default connect(mapStateToProps, {getUserInfo})(Dashboard)
