import React from "react";
import "../styles/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="footerWrapper">
        <p>© {new Date().getFullYear()}, Built by Victor Yu</p>
        <a
          href="https://unsplash.com/photos/o78epm7JJCI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Photo by Arseny Togulev on Unsplash
        </a>
      </div>
    </footer>
  );
}
