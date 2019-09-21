import React from 'react';

export const HTML = ({ children }) => {
  return (
    <html>
        <head>
        </head>
            <body>
                {children}
                <script src="http://localhost:9000/dist/bundle.js"></script>
            </body>
    </html>
  );
};
