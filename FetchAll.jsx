import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';

class FetchAll extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			data:[],
		};
	}

	componentDidMount()
	{
		fetch("http://localhost/laravelApi/public/api/fetchData")
		.then(results=>{
			console.log(results);
			return results.json();
		}).then(data => {
			let data= data.tesults.map(dat)=>{
				return {
					console.log(dat.results)
				}
			}
		})
	}
}


export default FetchAll;