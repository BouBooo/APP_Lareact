import React from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: [],
            search: ''
        }
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8000/api/pictures')
            .then(res => {
                this.setState({ pictures : res.data })
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    handleSearchChange = event => {
        this.setState({ search : event.target.value }, function() {
            console.log(this.state)
            if(this.state.search === '') {
                this.getArticles()
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.getArticles()
    }

    getArticles() {
        let bodyFormData = new FormData()
        bodyFormData.set('search', this.state.search)

        axios.post('http://127.0.0.1:8000/api/pictures', bodyFormData)
            .then(res => {
                this.setState({ pictures : res.data })
            })
            .catch(error => {
                console.log(error.response)
            })

    }

    render() {
        return (
            <>
                <Navbar/>
                <div class="container my-5">
                    <div class="d-flex justify-content-center mb-5">
                        <form class="form-inline my-2 my-lg-0" method="POST" onSubmit={this.handleSubmit}>
                            <input class="form-control mr-sm-2" name="search" onChange={this.handleSearchChange} type="search" placeholder="Search a picture here..."/>
                        </form>
                    </div>
                    <div class="row justify-content-between">
                        {
                            this.state.pictures.map((picture) => 
                                <div class="card mx-2 my-3" style={{ width: '350px' }}>
                                <img class="card-img-top" src={`http://127.0.0.1:8000/storage/pictures/${picture.image}`} alt="Card image cap"/>
                                    <div class="card-body">
                                        <h5 class="card-title">{ picture.title }</h5>
                                        <p class="card-text">{ picture.description }</p>
                                        <Link to={`/pictures/${picture.id}`} class="btn btn-primary">En savoir plus</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Home