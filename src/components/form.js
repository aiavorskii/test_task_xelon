import React, { Component } from "react";
import $ from 'jquery';

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                "subscribe-email": "",
            },
            message: "",
        };
    }

    handleSubmit = async e => {
        e.preventDefault();
        const email = $("#send_email").val();
        const cid = typeof ga === "function" && Object.hasOwnProperty.bind(ga)('getAll') ? ga.getAll()[0].get('clientId') : '2014157267.1590392502'; // hardcoded value, it is generated via Google analytics
        const referrer = getCookie("referrer");
        const url = "https://vdc.xelon.ch/api/user/trial/subscribe?email=" + email + "&cid=" + cid + "&referrer=" + referrer;

        const res = await fetch(url, {
            method: "POST",
        });

        const data = await res.json();

        if (res.ok) {
            $('.msg').html(data.message).addClass('rose-c').fadeIn('slow');
            $(".send-subscribe").remove();
            $("#open-popup .modal-area").css('padding-bottom', '60px');
        } else {
            if (data.error === "Email has been already used") {
                $("form.send-modal-data").append('<a class="danger-btn" href="https://vdc.xelon.ch/login">Go to Login</a>');
                $(".send-subscribe").remove();
                $('.msg').html(data.error).addClass('rose-c').fadeIn('slow');
            } else if (data.error && data.error.email) {
                $('.msg').html(data.error.email).addClass('rose-c').fadeIn('slow');
            } else if (data.error) {
                $('.msg').html(data.error).addClass('rose-c').fadeIn('slow');
            }
        }
    };

    handleInputChange = e => {
        this.setState({
            values: { ...this.state.values, [e.target.name]: e.target.value }
        });
    };

    render() {
        return (
            <form className="send-modal-data" method="POST">
                <input id="send_email"
                       name="subscribe-email"
                       type="text"
                       className="modal-input"
                       placeholder="Email *"
                       value={this.state.values.email}
                       onChange={this.handleInputChange}
                       required />
                <div className="success-msg">
                    <div className="msg"></div>
                </div>
                <input type="submit"
                       name="subscribe-form"
                       id="vdc-send-modal"
                       className="danger-btn send-subscribe not-empty"
                       onClick={this.handleSubmit}
                       value="Start now!" />
            </form>
        );
    }
}

export default Form;