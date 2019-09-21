import React from 'react';

export const HTML = ({ children }) => {
  return (
    <html>
        <head>
        </head>
            <body>
                {children}
                <script src="dist/bundle.js"></script>
            </body>
    </html>
  );
};
