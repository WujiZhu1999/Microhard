import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from '../../../helpers/axiosConfig';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';


class General_Info extends Component{
    constructor(props) {
      super(props);
      this.getGeneral = this.getGeneral.bind(this);
      this.onChangeDesc = this.onChangeDesc.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.handleGeneralSubmit = this.handleGeneralSubmit.bind(this);
      this.state = {
        name: "",
        description: "",
      };
    }

    componentDidMount = () =>{
        this.getGeneral();
    }

    getGeneral = () =>{
        axios.get('/project/'+this.props.id).then((res) => {
            this.setState({
                name: res.data.project.name,
                description: res.data.project.description,
            });
        })
        .catch((error) => {});
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    onChangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    handleGeneralSubmit = () =>{
        axios.post('/project/update/'+ this.props.id, {"name":this.state.name, "description": this.state.description})
        .catch((error) => {});
    }

    render(){
        return(
            <Fragment>
                <Typography>
                    General Information
                </Typography>
                <Divider/>
                <form onSubmit={this.handleGeneralSubmit} fullWidth>
                    <Typography>
                        Name
                    </Typography>
                    <TextField 
                        value={this.state.name}
                        onChange={this.onChangeName}
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        variant="outlined"
                        required
                    />
                    <br/>
                    <Typography>
                        Description
                    </Typography>
                    <TextField 
                        value={this.state.description}
                        onChange={this.onChangeDesc}
                        fullWidth
                        multiline
                        InputProps={{ disableUnderline: true }}
                        variant="outlined"
                    />
                    <br/>
                    <Button
                        fullWidth
                        type="submit"
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>

            </Fragment>
        )
    }
}

export default (General_Info);