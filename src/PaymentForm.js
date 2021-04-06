import React from "react";
import Card from "react-credit-cards";
import styles from "./App.css";
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
    } from "./utils";
import "react-credit-cards/es/styles-compiled.css";
import ReactDOM from 'react-dom';
import App from './App';


export default class PaymentForm extends React.Component {

    constructor(props){
        super (props);

        this.state = {
            id: props.id,
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            focused: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }
          this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                 acc[d.name] = d.value;
                    return acc;
            }, {});
        this.save(formData);
        this.clearEntries();
        this.form.reset();
    };

    clearEntries = () => {
        this.setState({
            name: "",
            number: "",
            expiry: "",
            cvc: "",
            focused: "",
            issuer: "",
            formData: "",
        })
    }

    save(formData) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        const request = "/payment";
        fetch(request, requestOptions)
        .then(response => response.json())
        .then(paymentResponse =>
            alert("Payment finished with success = " + paymentResponse.success)
        )
        .catch((e) => {alert("Error in saving record!!!!!")});
    }

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

            return (
                <div id="main">
                    <div id ="card">
                        <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                </div>
                    <div>
                        <form id="paymentForm" ref={c => (this.form = c)} onSubmit={this.handleSubmit}  >
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number E.g.: 49..., 51..., 36..., 37..."
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                             <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                             />

                            <div  id="cvv">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control"
                                    placeholder="Valid Thru: MM/YY"
                                    pattern="(?:0[1-9]|1[0-2])\/2[1-9]"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control"
                                    placeholder="CVC"
                                    pattern="\d{3}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    />
                            </div>
                                 <input type="hidden" name="issuer" value={issuer} />
                                    <div id="buttons">
                                        <button id="pay" >PAY</button><br/>
                                    </div>
                        </form>

                        <button id="cancelBtn" onClick={this.props.cancelPayment}>CANCEL</button>

                    </div>

                    {formData && (
                        <div className="App-highlight">
                            {formatFormData(formData).map((d, i) => (
                            <div key={i}>{d}</div> ))}
                        </div>
                    )}
                </div>
            );
    }
}

