import React from 'react'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';

class GroupList extends React.Component {
	constructor(props) {
		super(props)

		this.renderGroups = this.renderGroups.bind(this)
	}

	renderGroups(group) {
		function renderPeople(person) {
			return(
				<li>{person}</li>
			)
		}
		return(
			<tr key={group.name}>
	      <td contentEditable>{group.name}</td>
	      <td>
	      <ul>
	      	{group.people.map(renderPeople)}
	      </ul>
				</td>
	      <td>does group table have this?</td>
	      <td>does group table have this?</td>
	 	 	</tr>	
	 	 	)

	}
	render() {
		let context = this
		console.log('userLogin is', context.props.userLogin)
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>People</th>
						<th>Medium</th>
						<th>Triggers Associated?</th>
					</tr>
				</thead>
				<tbody>
					{this.props.groups.map(this.renderGroups)}
				<RaisedButton type="button" label="add a new one" secondary={true} />
				</tbody>
			</table>
		)
	}
}

export default GroupList