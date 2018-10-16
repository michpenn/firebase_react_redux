import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.petNameInput = React.createRef();
    this.petAgeInput = React.createRef();
    this.petBreedInput = React.createRef();
    this.petFavoriteTreatInput = React.createRef();
    this.userTypeInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      petName: this.petNameInput.current.value,
      petAge: this.petAgeInput.current.value,
      petBreed: this.petBreedInput.current.value,
      petFavoriteTreat: this.petFavoriteTreatInput.current.value,
      userType: this.userTypeInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };
  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    required
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userType">User Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userType"
                    minLength="2"
                    required
                    ref={this.userTypeInput}
                    defaultValue={client.userType}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    disabled={disableBalanceOnEdit}
                  />
                  <div className="form-group">
                    <label htmlFor="petName">Pet Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="petName"
                      minLength="2"
                      required
                      ref={this.petNameInput}
                      defaultValue={client.petName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="petAge">Pet Age</label>
                    <input
                      type="text"
                      className="form-control"
                      name="petAge"
                      required
                      ref={this.petAgeInput}
                      defaultValue={client.petAge}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="petBreed">Pet Breed</label>
                    <input
                      type="text"
                      className="form-control"
                      name="petBreed"
                      required
                      minLength="1"
                      ref={this.petBreedInput}
                      defaultValue={client.petBreed}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="petFavorite Treat">
                      Pet's Favorite Treat
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="petFavoriteTreat"
                      ref={this.petFavoriteTreatInput}
                      defaultValue={client.petFavoriteTreat}
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
