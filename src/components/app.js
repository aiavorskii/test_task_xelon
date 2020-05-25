import React, { Component } from "react";
import Form from "./form";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                {/* Popup content should be a separate component, but simplified for this example */}
                <div className="mfp-bg">
                </div>
                <div className="mfp-wrap">
                    <div className="mfp-container">
                        <div className="mfp-content">
                            <div className="white-popup">
                                <div className="modal-area">
                                    <div className="modal-bold-header">
                                        Sign up and test 30 days for free!
                                    </div>
                                    <Form />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;