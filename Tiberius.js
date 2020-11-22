// Tiberius.js
// Library for accesing JSON API of Philomena Imageboards
// GitHub: https://github.com/ChristianSilvermoon/Tiberius.js
// License: WTFPL v2

function fetchPromise( url ) {
	return new Promise( (resolve, reject) => {
		fetch( url ).then( response => {
			response.json().then( json => {
				resolve(json);
			}).catch( error => reject(error) )
		}).catch( error => reject(error) )
	});
}

export default class {
	constructor(domain, filter = "default") {
		//error checking
		if ( !domain || typeof(domain) != "string") { throw("Malformed Tiberius Constructor: Invalid or Missing Domain") }

		//Initial Values
		this._filter	= 0; //Initialized to 0
		this.domain	= domain;
		this._apiVer	= "1";
		this._cache	= {};

		this.filter = "default"; // Attempt to request Default Filter from server.
	}

	get filter() {
		return this._filter;
	}

	set filter(id) {
		if ( typeof(id) == "string" ) {
			//If passed a string, try to match against a system filter.
			this.getSystemFilters().then( r => {
				let filterChanged = false;
				r.filters.forEach( filter => {
					if ( filter.name.toLowerCase() == id.toLowerCase() ) {
						if ( this._filter == filter.id ) {
							//Warn against bad practice
							console.warn("Tiberius Filter Setter: Target server's response matches current filter ID. \n\nUnless you know what you're doing, please avoid setting the filter to the current filter via strings. This makes unnecessary API requests to the target server.")
						}
						this._filter = filter.id;
						this._cache.filterInfo = filter;
						filterChanged = true;
					}
				})
				
				if ( ! filterChanged ) {
					//Throw an error if the filter doesn't exist.
					console.warn(`Tiberius Filter Setter: Filter "${id}" does not exist; filter unchanged.`)
				}
			})
			
		} else if (typeof(id) == "number") {
			this._filter = id;
			this._cache.filterInfo = null;
		}
	}

	search(query, extraParams = {}) {
		const filter		= extraParams.filter? resolveFilter(extraParams.filter) : this._filter;
		const sortDir		= extraParams.sortDir? extraParams.sortDir : "desc";
		const sortBy		= extraParams.sortBy? extraParams.sortBy : "created_at";
		const perPage		= extraParams.perPage? extraParams.perPage : 19;
		const page		= extraParams.page? extraParams.page : 1;
		const sQuery		= encodeURIComponent(query);

		const searchURL		= `${this.domain}/api/v${this._apiVer}/json/search?` +
			`q=${sQuery}` +
			`&filter_id=${filter}` +
			`&sd=${sortDir}` +
			`&sf=${sortBy}`+
			`&perpage=${perPage}` +
			`&page=${page}`;

		return fetchPromise( searchURL );

	}

	favedBy(userID, extraParams = {}) {
		return this.search(`faved_by:${userID}`, extraParams);
	}

	post(id) {
		return fetchPromise(`${this.domain}/api/v${this._apiVer}/json/images/${id}`);
	}

	postOmbed(id, extraParams = {}) {
		let url = `${this.domain}/api/v${this._apiVer}/json/oembed?url=${this.domain}/images/${id}`;
		if ( extraParams.maxWidth ) {
			url += `&maxwidth=${extraParams.maxWidth}`;
		}

		if ( extraParams.maxHeight ) {
			url += `&maxheight=${extraParams.maxHeight}`;
		}

		return fetchPromise(url);
	}

	getFeatured() {
		return fetchPromise(`${this.domain}/api/v${this._apiVer}/json/images/featured`);
	}

	getSystemFilters() {
		return fetchPromise(`${this.domain}/api/v${this._apiVer}/json/filters/system`);
	}
}
