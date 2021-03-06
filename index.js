'use strict';

const tmdbHost = 'https://api.themoviedb.org/3/search/movie';
const apiKey = '9840a4ef43adc5fd058fda881abd1b00';

class App extends React.Component {
	render() {
		return <SearchForm />;
	}
}

class SearchForm extends React.Component {

	constructor() {
		super();
		this.state = {searchquery: '', results: []};
	}

	handleEntry(e) {
		e.preventDefault();
		this.setState({searchquery: e.target.value});
	}

	handleSearch(e) {
		e.preventDefault();
		var instance = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', `${tmdbHost}?api_key=${apiKey}&query=${this.state.searchquery}`);
		xhr.onload = function() {
	    if (xhr.status === 200) {
				instance.setState({results: JSON.parse(xhr.response).results});
		  } else {
	      console.log('Request failed.  Returned status of ' + xhr.status);
	    }
		};
		xhr.send();
	}

	render() {
		let listofresults = this.state.results.map(result => {
			return (
				<li>{result.title}</li>
				);
		});
		return (
			<div>
				<div className="searchform">
					<p>Enter your search term:</p>
					<input type="text" className="textfield" value={this.state.searchquery} onChange={this.handleEntry.bind(this)} />
					<button onClick={this.handleSearch.bind(this)}>Search</button>
				</div>
				<div className="listofresults">
					<ul>
						{this.state.results.length > 0 ? listofresults : null}
					</ul>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
