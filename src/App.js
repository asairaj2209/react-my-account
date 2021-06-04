import './App.css';
import ReactSelect from "react-select";
import axios from "axios";
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        loginId: "",
        email: "",
        telephonenumber: "",
        displayname: "",
        businessContact: "",
        faxNumber: "",
        department: [""]
      },
      formErrors: {
        loginId: null,
        email: null,
        telephonenumber: null,
        displayname: null,
        businessContact: null,
        faxNumber: null,
        department: null
      }
    };
    this.departmentList = [
      { value: "Hospitality", label: "Hospitality" },
      { value: "Hr", label: "Hr" },
      { value: "Software sector", label: "Software sector" }
    ];


  }



  handleChange = e => {
    const { name, value } = e.target;
    const { form, formErrors } = this.state;
    let formObj = {};
    formObj = {
      ...form,
      [name]: value
    };

    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorsObj = {};
      const errorMsg = this.validateField(name, value);
      formErrorsObj = { ...formErrors, [name]: errorMsg };
      this.setState({ formErrors: formErrorsObj });
    });
  };

  validateField = (name, value, refValue) => {
    let errorMsg = null;
    switch (name) {
      // case "name":
      //   if (!value) errorMsg = "Please enter Name.";
      //   break;
      case "email":
        if (!value) errorMsg = "Please enter business email Address";
        else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        )
          errorMsg = "Please enter valid Email.";
        break;

      case "displayname":
        if (!value) errorMsg = "Please enter display name.";
        break;



      default:
        break;
    }
    return errorMsg;
  };

  validateForm = (form, formErrors, validateFunc) => {
    const errorObj = {};
    // eslint-disable-next-line
    Object.keys(formErrors).map(x => {
      let refValue = null;
      const msg = validateFunc(x, form[x], refValue);
      if (msg) errorObj[x] = msg;
    });
    return errorObj;
  };

  handleSubmit = () => {
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);
    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    }
    console.log("Data: ", form);

    let loginDetail = {
      email: form.email,
      username: form.displayname
    };

    console.log('Data: ', loginDetail);

    axios.post(`https://jsonplaceholder.typicode.com/users`, loginDetail).then(res => {
      // console.log('testd');
      console.log(res.data);
    });
  };

  render() {
    const { form, formErrors } = this.state;
    return (
      <div className="my-account">
        <h3 className="title"><img width="40" src={logo} alt="Logo" />My Account 1</h3>
        <div className="card-info">
          <Row >
            <Col >
              <Card body className="card-modify">
                <CardTitle tag="h4">My Role</CardTitle>
                <CardSubtitle tag="h5" className="mb-20">Primary Admin</CardSubtitle>
                <CardText>April 22, 2021</CardText>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col>
              <h4>Basic Information</h4>
              <p>All fields marked with asterisks(*) are mandatory.</p>
            </Col>
          </Row>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>
                Login ID:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="loginId"
                value={form.loginId}
                onChange={this.handleChange}
                onBlur={this.handleChange} disabled
              />
              {formErrors.loginId && (
                <span className="err">{formErrors.name}</span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>
                Business Email Address:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Enter business email"
                value={form.email}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.email && (
                <span className="err">{formErrors.email}</span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">

            </div>

          </div>
        </div>

        <br></br>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>
                Display Name:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="displayname"
                value={form.password}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.displayname && (
                <span className="err">{formErrors.displayname}</span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">

              <label>
                Department:
                  </label>
              <ReactSelect
                name="department"
                options={this.departmentList}
                placeholder="select department"
                value={this.departmentList.find(x => x.value === form.department)}
                onChange={e =>
                  this.handleChange({
                    target: {
                      name: "department",
                      value: e.value
                    }
                  })
                }
              />
              {/* {formErrors.department && (
                    <span className="err">{formErrors.department}</span>
                  )} */}

            </div>
          </div>
        </div>

        <br></br>

        <div className="row">
          <div className="col-md-4">

            <div className="form-group">
              <label>
                Business Contact:
                  </label>
              <input
                className="form-control"
                type="mobile"
                name="businessContact"
                value={form.businessContact}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {formErrors.businessContact && (
                <span className="err">{formErrors.businessContact}</span>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>
                Telephone:
                  </label>
              <input
                className="form-control"
                type="mobile"
                name="telephonenumber"
                value={form.telephonenumber}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              // onKeyPress={this.validateNumber}
              />
              {formErrors.telephonenumber && (
                <span className="err">{formErrors.telephonenumber}</span>
              )}
            </div>
          </div>
          </div>
          <br></br>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">

                <label>
                  Fax:
                  </label>
                <input
                  className="form-control"
                  type="mobile"
                  name="faxNumber"
                  value={form.faxNumber}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                // onKeyPress={this.validateNumber}
                />
                {formErrors.faxNumber && (
                  <span className="err">{formErrors.faxNumber}</span>
                )}

              </div>

            </div>
          </div>
        
        {/* </div> */}

        <br></br>

        <div className="form-group">
          <input
            type="button"
            className="btn btn-primary"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

// class App extends React.Component {

//   render(){
//     let lang = ['Java', 'DotNet', 'Python'];
//     let filtervalue = this.props.selectedvalue;
//     let toggleval = this.props.toggleval === 'true';
//     let newArray = filtervalue && filtervalue !== "0" ? lang.filter(item => item === filtervalue ) :lang
//     return (
//    <div class="card">
//   <div class="card-header">
//     React Application
//   </div>
//   <div class="card-body">
//   <ul class="list-group list-group-flush">
//   {
//     newArray.map((value,index)=>{
//       return <li class="list-group-item" key={index}>{value}</li>
//     })
//   }
//   </ul>
//   </div>
//   <div class="card-body">
//   <div class='row'>
//   <div class="col-6">
//     <button type="button" id="reactincrementer" class="btn btn-outline-secondary">Increment Counter</button>
//     </div>
//     <div class="col-6">
//     {
//       toggleval && 
//       <span class="badge badge-info">Called from angular app!!!</span>
//     }
//             </div>
//     </div>
// </div>
// </div>
//     )
// }
// }

export default App;
