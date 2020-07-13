import React from 'react'
import { Redirect } from 'react-router-dom'


class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        console.log(this.props.match.params)
        let userToken = this.props.match.params.token 
        let provider = this.props.match.params.provider 

        if(!userToken || !provider) {
            this.setState({ redirect : true })
        }

        localStorage.setItem('token', userToken)
        this.setState({ redirect : true })
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to="/"/>)
        }
        return (
            <>
                Google auth
            </>
        )
    }
}

export default Authentication