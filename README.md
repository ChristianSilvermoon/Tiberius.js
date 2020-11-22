# Tiberius.js

Tiberius.js or just Tiberius is a successor to the former project [Derpi.js](https://github.com/ChristianSilvermoon/Derpi.js)

It will be as similar as possible.

Just as [Philomena](https://github.com/derpibooru/philomena) is named after Princess Celestia's pet Pheonix, this project is named Tiberius, after Princess Luna's pet Oposum

## Getting Started

Note: The majority of shown examples will reference Derpibooru.org for simplicity.

```JavaScript
import Tiberius from "./Tiberius.js"; //Import Class

// Tiberius' constructor can be used in multiple ways! Choose which best fits your use case.

// First parameter is required and is a string for the domain.
const TiberiusInstance = new Tiberius("https://derpibooru.org");
// In this instance, Tiberius attempts to ask Philomena for a system filter named "default"

//or initialize with a specific filter via numeric ID:
const TiberiusInstance = new Tiberius("https//derpibooru.org", 37430);
// In this instance, Tiberius uses the numeric value directly, and does NOT ask Philomena to identify it.

//or intialize with a specific System Filter via Name:
const TiberiusInstance = new Tiberius("https://derpibooru.org", "Maximum Spoilers");
// In this instance, Tiberius attempts to ask Philomena for a system filter named "maximum spoilers"

```
**An important note:** Most methods return ***promises***, so please expect this!

Tiberius was originally built for Derpibooru's implementation of Philomena.

If you are attempting to use Tiberius with different target domain, please keep this in mind!

This project does ***NOT*** guarantee compatability with websites other than Derpibooru, but feel free to submit an Issue should you find any compatabillity problems.

For Derpibooru's API reference, see https://derpibooru.org/pages/api

## Properties

### `domain`
Change the target domain.

To change, do
```JavaScript
// Generic Example
TiberiusInstance.domain = "https://example.com";

// Example with an actual Philomena site other than Derpibooru
TiberiusInstance.domain = "https://furbooru.org";
```

It may be a good idea to substitute `TiberiusInstance` with a shorthoof (teehee) for the site you're using if you're using multiple sites in order to avoid confusion.

Example
```JavaScript
import Tiberius from "./Tiberius.js"

Derpi = new Tiberius("https://derpibooru.org"); //Derpibooru
Furb = new Tiberius("https://furbooru.org"); //Furbooru
```

## Setters / Getters

### `filter`

#### Getting
Returns the numerical ID of the currently selected filter.

#### Setting
When setting the filter, you can use a Numerical ID or the name of a **System Filter**

When setting the value to a string, Tiberius will request the **System Filters** from the target domain's API and set the Numerical Filter ID to the filter that matches your string.

Tiberius compares these values in a **case insensitive manner** so "Default" is the same as "default"

This setter is also called from the constructor.


## Methods

### `search("query", {extraParams})`
Returns a promise for the search result JSON.
Searches for the specified query. You can use the `extraParams` to modify the results. See the reference below for details. (ex: https://derpibooru.org/api/v1/json/search?q=dashie%2C+hugging%2C+cake)

**Examples**
```JavaScript

//Basic
Derpi.search("dashie, hugging, cake").then(
	results => {
		//output result JSON to terminal
		console.log(results);
	}
)

//With all OPTIONAL extraParams included (same as above)
Derpi.search("dashie, hugging, cake", {
	"filter": "DEFAULT",
	"sortDir": "desc",
	"sortBy": "created_at",
	"perPage": 20,
	"page": 1
}).then(
	results => {
		//output result JSON to terminal
		console.log(results);
	}
)

```

**Optional Extra Params**

Parameter | Values | Function
--------- | ------ | ----------
filter  | Numerical or Filter Alias | Overrides current set filter. (`derpiJS.filter` by default)
sortDir | `asc` or `desc` | Changes the sort direction of results to ascending or descending respectively (`desc` by default)
sortBy | `created_at`, `score`, `wilson`, `relevance`, `width`, `height`, `comments`,`random` or `random:` + Numerical Value | Changes how results are sorted (`created_at` by default)
perPage | `0`-`50` | Changes the number of results per page (`20` by default)
page | Numerical value | Selects page of results (`1` by default)

### `favedBy("USER", {extraParams})`
Identical to `Derpi.search("faved_by:USER")`

**Examples**
```JavaScript
Derpi.favedBy("USER").then(
	result => {
		console.log(result);
	}
)

//Identical to the above
Derpi.search("faved_by:USER").then(
	result => {
		console.log(result);
	}
)
```

### `post(id)`
Returns JSON Data for a specific post. (ex: https://derpibooru.org/api/v1/json/images/0)

**Examples**
```JavaScript
Derpi.post(0).then(
	postJSON => {
		console.log(postJSON);
	}
)
```

### `postOembed(id)`
Gets the oEmbed JSON for a post

```javaScript
Derpi.postOembed(0).then(
	postJSON => {
		console.log(postJSON);
	}
)
```

### getFeatured()
Gets the **Featured Image**

```javaScript
Derpi.getFeatured().then(
	postJSON => {
		console.log(postJSON);
	}
)
```

### getSystemFilters()
Gets the system filters.

```javaScript
Derpi.getSystemFilters().then(
	filterListJSON => {
		console.log(filterListJSON);
	}
)
```
