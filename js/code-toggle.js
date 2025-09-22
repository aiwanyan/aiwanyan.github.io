/* 右侧小按钮控制折叠/展开代码（不再点语言名）——极简稳定版 */
(function () {
  function addButtonAndBind(box) {
    // 已经加过就别重复
    if (box.dataset._toggleBound) return;

    // 找到工具条（没有就建一个）
    let tools = box.querySelector('.highlight-tools');
    if (!tools) {
      tools = document.createElement('div');
      tools.className = 'highlight-tools';
      // 插在代码块最前
      box.insertBefore(tools, box.firstChild);
    }

    // 右侧按钮
    const btn = document.createElement('button');
    btn.className = 'code-fold-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '折叠/展开代码');
    btn.innerHTML = '▾';   // 小三角
    tools.appendChild(btn);

    // 点击切换 closed
    btn.addEventListener('click', function () {
      box.classList.toggle('closed');
      btn.innerHTML = box.classList.contains('closed') ? '▸' : '▾';
    });

    // 初始展开
    box.classList.remove('closed');
    box.dataset._toggleBound = '1';
  }

  function bindAll(scope) {
    const root = scope || document;
    // 兼容 figure.highlight 与 .highlight 两种结构
    const blocks = root.querySelectorAll('figure.highlight, .highlight');
    blocks.forEach(addButtonAndBind);
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindAll(document);
  });

  // 兼容 PJAX
  document.addEventListener('pjax:success', function () {
    bindAll(document);
  });
})();
