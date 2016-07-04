const React = require('react');
const DragAndDropImage = require('../input/dndSelector.jsx').DragAndDropImage;
const DragAndDrop = require('../input/dndSelector.jsx').DragAndDrop;
module.exports = React.createClass({
	displayName: 'AchievementForm',
	handleSubmit(event) {
		'use strict';

		event.preventDefault();
		const data = {
			id: this.props.editor.id,
			rank1: this.rank1.getValue(),
			rank2: this.rank2.getValue(),
			rank3: this.rank3.getValue()
		}
		request.post('/editor/:id/achievements')
			.send(data)
			.then(() => {
				window.location.href = '/editor/:id';
			})
			.catch((res) => {
				const error = res.body.error;
				this.setState({
					error,
					waiting: false
				});
			});
	},
	render() {
		'use strict';
		const achievements = this.props.achievement.model.map(function(achievement) {
			if (achievement.unlocked) {
				return (
					<div className="row well">
						<div className="col-md-2">
						<DragAndDropImage
							height="100px"
							src={achievement.badgeUrl}
							achievementId={achievement.id}
							achievementName={achievement.name}
						/>
						</div>
						<div className="col-md-8">
							<div className="h2">
								{achievement.name}
							</div>
							<p>{achievement.description}</p>
						</div>
					</div>
				);
			}
		});
		const locked = this.props.achievement.model.map(function(achievement) {
			if (!achievement.unlocked) {
				return (
					<div className="row well">
						<div className="col-md-2">
							<img height="100px" src={achievement.badgeUrl}></img>
						</div>
						<div className="col-md-6">
							<div className="h2">
								{achievement.name}
							</div>
							<p>{achievement.description}</p>
						</div>
					</div>
				);
			}
		});

		const rankName = this.props.achievement.model.map(function(achievement) {
			if (achievement.unlocked) {
				return (<option value={achievement.id}>{achievement.name}</option>);
			}
		});

		const nullOption = (<option value="none"> </option>)
		const rankUpdate = (
			<form id="rankSelectForm" method="post" className="form-horizontal">
				<div className="row dnd-container form-group">
					<DragAndDrop name="rank1"/>
					<DragAndDrop name="rank2"/>
					<DragAndDrop name="rank3"/>
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-default">
						update
					</button>
				</div>
			</form>
		)
		return (
			<div>
				{rankUpdate}
				<div className="h1">Unlocked Achievements</div>
				{achievements}
				<div className="h1">Locked Achievements</div>
				{locked}
			</div>
		);
	}
});
