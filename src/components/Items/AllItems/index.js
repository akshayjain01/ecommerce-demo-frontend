import React from 'react';
import Axios from 'axios';
//Internal
import '../../../All.css';
import { Table } from 'react-materialize';

class AllItems extends React.Component{
  constructor( props ) {
		super( props );
		this.state = {
			query: '',
      results: [],
      loading: false,
      message: '',
      page: 0
		};
	}

  fetchSearchResults = (updatedPageNo, query ) => {
    const pageNumber = updatedPageNo ? `&offset=${updatedPageNo}` : '';
    const searchUrl = `http://localhost:8080/mobiles/?s=${query}${pageNumber}&limit=5`; 

    if (this.cancel) {
      this.cancel.cancel();   // Cancel the previous request before making a new request
    }
    this.cancel = Axios.CancelToken.source();   // Create a new CancelToken
    
    Axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        this.setState({
          results: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        if (Axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: 'Failed to fetch results.Please check network',
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if ( ! query ) {
      Axios.get('http://localhost:8080/mobiles/').then(res=>{
          const mobileData = res.data;
          this.setState({results:mobileData});
      })
    } 
    else {

      this.setState({ query, loading: true, message: '' }, () => {
        this.fetchSearchResults(0, query);
      });
    }
  };

  handleOnClickNext = (event) => {
    const query = this.state.query;

    if(this.state.page <= Math.ceil(this.state.results.length/parseFloat(5))){
      this.setState({ query, loading: true, message: '', page: this.state.page+1}, () => {
        this.fetchSearchResults(this.state.page, query);
      });
    }

  };

  handleOnClickPrevious = (event) => {
    const query = this.state.query;

    if(this.state.page > 0){
      this.setState({ query, loading: true, message: '', page: this.state.page-1}, () => {
        this.fetchSearchResults(this.state.page, query);
      });
    }

  };

  renderSearchResults = () => {
    const result = this.state.results;
    if (result.length) {
      return (
        <div className="results-container">
          {result.map((alldata) => {
            return (
              <tr>
                <td><img alt={alldata.name} src={alldata.image} width="250" height="200"/></td>
                <td>
                  <u><h4 id="product-name">{alldata.brand} {alldata.model} </h4></u>
                  <h5 id="product-description">{alldata.memories} GB</h5>
                  <h5 id="product-price">${alldata.price}</h5>
                </td>
              </tr>
            );
          })}
        </div>
      );
    }
  };

  componentWillMount(){
      Axios.get('http://localhost:8080/mobiles/').then(res=>{
          const mobileData = res.data;
          this.setState({results:mobileData})
      })
  }

    render(){
      return(
        <div>
          <div className="container">
            <label className="search-label" htmlFor="search-input">
              <input
                type="text"
                id="search-input"
                placeholder="Search..."
                onChange={this.handleOnInputChange}
              />
              <i className="fa fa-search search-icon"/>
            </label>
          </div>
          
          <div>
            <Table hoverable striped>
              {this.renderSearchResults()}
            </ Table>
          </div>
          <button onClick={this.handleOnClickPrevious}><img width='20px' height='20px' alt="Previous Page" src="https://cdn.onlinewebfonts.com/svg/img_140361.png" /></button>
          <button onClick={this.handleOnClickNext}><img width='20px' height='20px' alt="Next Page" src="https://img.icons8.com/cotton/2x/circled-chevron-right.png" /></button>
        </div>
      )}
}


export default AllItems;