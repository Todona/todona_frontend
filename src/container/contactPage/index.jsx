import React from "react";
import './contactPage.css';

const ContactPage = () => {
  return (
    <div className="ContactPage">
      <h1 style={{ fontSize: "48px", margin: "0.5rem 0", color: "white" }}>Contact</h1>
      <hr /> <br /> <br />
      <div className="pic" style={{ textAlign: "center" }}>
          <img src="https://lh3.googleusercontent.com/yyNAMKLwuNTxvmwzU3d5qBeb9fE1xjuCDlGIY8ghW6L66FiWlt5ElYxjsfUSF4XwmDCkFLprCGqse8NCJtt1oB9tCVnHd6fil01gvtBZgD7lk954Fxso0pHYCCfYKZfj_IQBzYjNscQ32Hw7xAPB_uGQwIZXz2KaeVvfQvhqeoKn_nebZAIbbgf2KZlb-vhCTHHsQuCJwhasE2wRj0fwruJBRweUgiJo023iTJHLiZcxRh53F6sAKZZZLuP1tHraj8Z7MrnmPxAtOTUv28tPDPGvZ1daxLMnydIeEngJLYjDWqclF5eV8gXsetg0oTMOD0AqyukToJ-dN0ETgnZJ5hVM1O5utw-e0f5mcF2vFKr8ZRQIH3SXEY-wSnL7UdcNiT1BlKBxWeDpNrTLTbKVnVKogBulJBllvdCyIShLg7p1bT8063Wr0Hr2Xx_cehst85RmH17MuxKVT0NeTnZKXGk-DoxPXBkfDW4pscmLKqDYEPysy4fh3uruZ1Bxqp1cng5lSe4ihWOIqU3G_kQOa8yYmPbMR7cL6bRTLeTGLwiSkgKw6rdRPZZZhQmRW0DtQPgsLTvBhHX0wZz0RuRVDcJY_bDuV6ALNqW9V1ok_dBXZPjx1CjXzeI1x6IdZGVkYE3DXh0S5FzB3rILKj5qWKsyNKf0xe7NPnESof-MnrOrzaUYT1psNUAWLFDf765K8WquaYr4FZy8MnFegtKlosW7=s1008-no?authuser=2" alt="profile-pic"
          style={{
            borderRadius: "50%",
            "width": "60%",
            height: "auto",
            backgroundColor: "#eaeaea",
            objectFit: "cover",
            "padding-bottom": "-50px",
            "filter": "drop-shadow(5px 5px 10px #93dbe9)"
          }}
          />
      </div>
      <br /> <br />
      <div className="card-container"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className="info">
          <h2>I'm RADSADORN</h2>
          <div style={{backgroundColor: "#c8c8c8", width: "25vw", height: "1px", margin: "1rem 0"}}></div>
          <p>Email : sutthiratphuto@gmail.com</p>
          <p>Tel : +669-7351-2529</p>
        </div>

        <div style={{ "padding-top": "40px" }}>
            <div className="contact">
                <a href="https://www.instagram.com/radsadorn">
                    <img className="item-m" alt="Sutthirat | Instagram" src="https://github.com/j4m3ee/j4m3ee.github.io/blob/gh-pages/assets/instagram.gif?raw=true" />
                </a>
                <a href="https://www.facebook.com/sutthirat.rat">
                    <img className="item-m" alt="Sutthirat | Facebook" src="https://github.com/j4m3ee/j4m3ee.github.io/blob/gh-pages/assets/facebook.gif?raw=true" />
                </a>
                <a href="https://github.com/radsadorn">
                    <img className="item-m" alt="Sutthirat | Github" src="https://github.com/j4m3ee/j4m3ee.github.io/blob/gh-pages/assets/github.gif?raw=true" />
                </a>
            </div>
          </div>
      </div>

    </div>
  );
};

export default ContactPage;