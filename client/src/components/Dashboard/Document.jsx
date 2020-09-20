import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
//import axios from 'axios';
import axios from '../../helpers/axiosConfig';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {Container, Paper} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import DocumentDialog from '../Dashboard/DocumentDialog';

export default class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onDelete = this.onDelete.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormSubmitPDF = this.onFormSubmitPDF.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  // onFormSubmit(e) {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', this.state.file);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   axios
  //     .post('/image/upload', formData, config)
  //     .then((response) => {
  //       alert('The file is successfully uploaded');
  //     })
  //     .catch((error) => {});
  // }
  onFormSubmitPDF(e) {
    e.preventDefault();
    console.log('access onFormSubmitPDF');
    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/pdf/upload', formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({file: e.target.files[0]});
  }
  onDelete(e) {
    console.log('onDelete function activated');
    e.preventDefault();
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .delete('/pdf/5f57882947ad6155d8f36837')
      .then((response) => {
        alert('deleted');
      })
      .catch((error) => {});
  }

  componentDidMount() {
    // const imgs = axios.get('/image').then((res) => {
    //   if (res.data.files) {
    //     const imgPic = res.data.files.map((ele) => (
    //       <img
    //         src={'/api/image/' + ele.filename}
    //         alt={'/image/' + ele.filename}
    //       />
    //     ));
    //     ReactDOM.render(imgPic, document.getElementById('all_img'));
    //   }
    // });

    const pdf = axios.get('/pdf').then((res) => {
      if (res.data.files) {
        const pdf = res.data.files.map((ele) => (
          <li>
            <a href={'/api/pdf/' + ele.filename}>{ele.filename}</a>
          </li>
        ));
        ReactDOM.render(pdf, document.getElementById('all_pdf'));
      }
    });
  }

  render() {
    return (
      <Fragment>
        <div style={{height: '120px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <Typography variant="h4" align="center" style={{color: '#fff'}}>
            Personal Documents
          </Typography>
        </div>

        <Helmet>
          <title>Microhard &middot; Personal Documents </title>
        </Helmet>

        <Container>
          <br />
          <br />
          <DocumentDialog
            onFormSubmitPDF={this.onFormSubmitPDF}
            onDelete={this.onDelete}
            onChange={this.onChange}
          />

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: '700'}}>Filename</TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Date Uploaded
                  </TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {' '}
                    <a href="#pdfFileLink">A.pdf</a>
                  </TableCell>
                  <TableCell align="right">17/09/2020</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete">
                      <DeleteIcon onClick={this.onDelete} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {' '}
                    <a href="#pdfFileLink">B.pdf</a>
                  </TableCell>
                  <TableCell align="right">18/01/2020</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete">
                      <DeleteIcon onClick={this.onDelete} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <ul>
            <div id="all_pdf"></div>
          </ul>
        </Container>
      </Fragment>
    );
  }
}
