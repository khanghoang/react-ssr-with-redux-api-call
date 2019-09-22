import React from "react";

export const HTML = ({ children, initialValues }) => {
  return (
    <html>
      <head></head>
      <body>
        <div id="root">
          {children}
        </div>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.__INITIAL_DATA__ = ${initialValues};
            `
          }}>
        </script>
        <script src="http://localhost:9000/dist/bundle.js"></script>
        <script>
          Foo.render();
        </script>
      </body>
    </html>
  );
};
