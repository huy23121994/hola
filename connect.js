import React from 'react';

export function connect(WrappedComponent, ...DataSource) {
	class connectClass extends React.Component {
		mounted = false

		componentDidMount() {
			this.mounted = true
			for(let data of DataSource){
				data.subscribe(this.safeUpdate);
			}
		}

		componentWillUnmount() {
			for(let data of DataSource){
				data.unSubscribe(this.safeUpdate);
			}
		}

		safeUpdate = () => {
			if(this.mounted) this.forceUpdate()
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	connectClass.displayName = `${getDisplayName(WrappedComponent)}_connected`;
	return connectClass;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}