const replacements: Record<string, string> = {};

// eslint-disable-next-line func-style
function replaceTextInNode(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;
    if (text) {
      for (const [original, replacement] of Object.entries(replacements)) {
        text = text.replace(new RegExp(original, 'g'), replacement);
      }
      node.nodeValue = text;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Skip script and style elements
    if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      for (const child of Array.from(node.childNodes)) {
        replaceTextInNode(child);
      }
    }
  }
}

replaceTextInNode(document.body);

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        replaceTextInNode(node);
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
