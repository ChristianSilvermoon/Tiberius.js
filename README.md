# Tiberius.js

Tiberius.js or just Tiberius is a successor to the former project [Derpi.js](https://github.com/ChristianSilvermoon/Derpi.js)

It will be as similar as possible.

Just as [Philomena](https://github.com/derpibooru/philomena) is named after Princess Celestia's pet Pheonix, this project is named Tiberius, after Princess Luna's pet Oposum

## Getting Started

Note: The majority of shown examples will reference Derpibooru.org for simplicity.

```JavaScript
import Tiberius from "./Tiberius.js"; //Import Class

const TiberiusInstance = new Tiberius;
```
**An important note:** Most methods return ***promises***, so please expect this!

The target domain defaults to `https://derpibooru.org`

If you are attempting to use Tiberius with different target domain, please keep this in mind!

This project does ***NOT*** guarantee compatability with websites other than Derpibooru, but feel free to submit an Issue should you find any compatabillity problems.

For Derpibooru's API reference, see https://derpibooru.org/pages/api

## Properties

### `domain`
Change the target domain.
It's `https://derpibooru.org` by default.

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

Derpi = new Tiberius; //Derpibooru
Furb = new Tiberius; //Furbooru

Furb.domain = "https://furbooru.org"
```

## Setters / Getters

### `filter`
Returns or sets the filter ID (numerical only).

When setting filters, you can use Derpibooru's aliases for the default filters in place of numerical IDs.

Remember, that these aliases apply **ONLY TO DERPIBOORU**, while you *can* use them with other websites they may use different IDs for their filters! For best practice do **NOT** use these aliases when not using Derpibooru, supply their proper numeric ID instead!

This also means you may need to **Change The Default Filter**  when using sites other than Derpibooru for correct functionality.

**Examples**
```JavaScript
Derpi.filter; //Returns 100073 if unmodified
Derpi.filter = 1234; //Sets filter ID to 1234
Derpi.filter = EVERYTHING; //Sets filter ID to 56027
```

**Filter Aliases (Setting Only)**

Alias           | ID (Click to view on Derpibooru)                
--------------- | ------------------------------------------------
DEFAULT         | [100073](https://derpibooru.org/filters/100073)
EVERYTHING      | [56027](https://derpibooru.org/filters/56027)
18+DARK         | [37429](https://derpibooru.org/filters/37429)
MAXSPOILERS 	| [37430](https://derpibooru.org/filters/37430)
LEGACYDEFAULT   | [37431](https://derpibooru.org/filters/37431)
18+R34          | [37432](https://derpibooru.org/filters/37432)

***IMPORTANT: Only use these with Derpibooru or one of it's alternate domains***

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
