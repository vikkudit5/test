import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			file:'',
			imagePreviewUrl: '',
      value:'',
      fetchAllData:[],

		};

		
   
    this.componentDidMount = this.componentDidMount.bind(this);
    this.textarea = this.textarea.bind(this);
    this.car = this.car.bind(this);
		this.name = this.name.bind(this);
		this.imageUpload = this.imageUpload.bind(this);
		this._handleImageChange = this._handleImageChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}



componentDidMount(event){
  fetch("http://localhost/laravelApi/public/api/fetchData")
    .then(results=>{
      return results.json();
    }).then(data => {
        
          let fetchAllData = data.data.map((val)=>{

          
              return(
                 <table className="table">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.description}</td>
                        <td>{val.image}</td>
                      </tr>
                    </tbody>
                  </table>

              )
            
          })
      
    })
}


textarea(event){
    this.setState({
      textarea:event.target.value,
    });
}

car(event){

    this.setState({

      car1:event.target.value,
    });
}

  name(event){
    this.setState(
      {
        value:event.target.value,

      }
    );

  }

 

    imageUpload() {
    	
      let image = this.state.imagePreviewUrl;
      let name = this.state.value;
    	let car = this.state.car1;
      let description = this.state.textarea;



    	axios.post('http://localhost/laravelApi/public/index.php/api/upload', {image :image,name:name,car:car,description:description})
              .then((response) => {

                console.log(response.data.status, response.data.data);
              this.setState({imagePreviewUrl:''});
              }).
              catch((error) => {console.log(error);});
    }


  _handleSubmit(e) {
    e.preventDefault();
    
  }

  _handleImageChange(e){
  	e.preventDefault();
  	let reader  = new FileReader();
  	let file = e.target.files[0];
  	reader.onloadend = () => {
  		this.setState({
  			file:file,
  			imagePreviewUrl:reader.result,

  		});
  	}

  	reader.readAsDataURL(file)

  }


  render(){
 
  	let {imagePreviewUrl} = this.state;
  	let $imagePreview = null;
  	if(imagePreviewUrl){
  		$imagePreview  = (<img src={imagePreviewUrl} />);
  	}

  	 return (
     <section>

        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">WebSiteName</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">All Details</a></li>
            </ul>
          </div>
        </nav>



        <div className="container">
        <h2>Add Details</h2>
          <form onSubmit={this._handleSubmit}>
            <div className="form-group">
              <label>Name</label>: 
              <input type="text"  className="form-control" value={this.state.value} onChange={this.name}/>
            </div>
            <div className="form-group">
              <label>Cars</label>:
              <select  className="form-control" onChange={this.car}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>:
              <textarea className="form-control" onChange={this.textarea}>
              </textarea>
            </div>
            <div className="form-group">
              <label>Image</label>
                <input type="file" className="form-control" onChange={this._handleImageChange} />
                <br></br><br></br>
            </div>
            <button type="button" onClick={this.imageUpload} className ="btn btn-primary">Submit</button>

          </form>
      </div>
      <div className="form-group" >
        {$imagePreview}
      </div>
     
      <div className="container">
        <button type="button" onClick={this.componentDidMount} className ="btn btn-primary">Show data</button>
      </div>

      <div className="container">
        {this.state.fetchAllData}
      </div>
      </section>
    )
  }

 
     
  }
   

export default App;