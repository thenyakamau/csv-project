import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
    render() {
        return (
            <div className="welcome_layout">
                <div className="container mt-5">
                    <center>
                        <h1>CLINICAL CLASSIFICATION MAPPING SYSTEM</h1>
                    </center>

                    <p>Clinical classification systems such as ICD (International Classification of Diseases), developed by WHO, have been used for many years to code clinical data for various statistical analysis purposes. This coded data is used not only nationally, but also internationally to compare clinical data around the world. Over the years, the clinical classification systems have changed, with various versions developed. Also, countries extend the clinical classification systems for the needs of their own country. This system allows you to find the mappings between the various versions developed.</p>
                    <center>
                        <Link
                            to="/search"
                            className="btn btn-primary btn-lg link_button"
                        >
                            <i className="fas fa-search"></i> Search
                        </Link>
                    </center>
                </div>
            </div>
        );
    }
}
