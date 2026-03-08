import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Refer.css";

export default function Refer() {
    const referralCode = "SURYA123";
    const referralLink = `https://yourapp.com/signup?ref=${referralCode}`;

    const [copied, setCopied] = useState(false);

    const copyReferral = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div id="site-main" className="site-main">
            <div id="main-content" className="main-content">
                <div id="primary" className="content-area">
                    {/* Breadcrumb */}
                    <div className="refer-breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <Link to="/my-account">My Account</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Refer A Friend</span>
                    </div>

                    <div className="referral-container">
                        <h1 className="refer-title">Invite Friends</h1>
                        <p className="subtitle">
                            Share your referral code and earn rewards
                        </p>

                        <div className="code-box">
                            <div className="code">{referralCode}</div>

                            <button
                                className="copy-btn"
                                onClick={copyReferral}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                        {copied && (
                            <div className="success">Copied to clipboard!</div>
                        )}

                        <div className="infographic">
                            <h3>How It Works</h3>
                            <div className="steps">
                                <div className="step">
                                    <div className="circle">1</div>
                                    <p>Share your referral code with friends</p>
                                </div>
                                <div className="arrow">→</div>
                                <div className="step">
                                    <div className="circle">2</div>
                                    <p>Your friend signs up using your referral</p>
                                </div>
                                <div className="arrow">→</div>
                                <div className="step">
                                    <div className="circle">3</div>
                                    <p>You earn rewards when they make their first purchase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
