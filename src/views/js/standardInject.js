includeButtons = window.location.pathname != "/update";

const headerCode = `
  <a href="/"><img src="../style/images/logo.png" /></a>
  <div id="buttons">
  ${
    includeButtons
      ? `
    <a id="franklin-header" href="/franklin">FHS</a>
    <a id="cleveland-header" href="/cleveland">CHS</a>
    <a id="ida-header" href="/ida">IHS</a>`
      : ""
  }
  </div>
  `;

const footerCode = `
  <div>
    <a href="/contact">Contact</a>
    <a href="/terms">Terms</a>
    <a href="/privacy">Privacy</a>
    <a href="/help">Help</a>
    <a href="/update">Update</a>
  </div>
`;

$("header").append(headerCode);
$("footer").append(footerCode);
