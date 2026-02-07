const listEl = document.getElementById('list');
const uploadForm = document.getElementById('uploadForm');
const createForm = document.getElementById('createForm');
const refreshBtn = document.getElementById('refreshBtn');
const uploadResult = document.getElementById('uploadResult');

async function loadList() {
  const res = await fetch('/api/inspirations');
  const data = await res.json();
  const items = data?.data || [];
  listEl.innerHTML = items
    .map(
      (i) => `
      <article class="item">
        <h3>${escapeHtml(i.title || 'Untitled')}</h3>
        ${i.image_url ? `<img src="${escapeAttr(i.image_url)}" alt="${escapeAttr(i.title || 'image')}" />` : ''}
        <p class="meta">作者：${escapeHtml(i.author || '-')} ｜ 分类：${escapeHtml(i.category || '-')}</p>
        ${i.prompt ? `<p>${escapeHtml(i.prompt)}</p>` : ''}
      </article>
    `
    )
    .join('');
}

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(uploadForm);
  uploadResult.textContent = '上传中...';
  const res = await fetch('/api/upload', { method: 'POST', body: form });
  const data = await res.json();
  if (data.success) {
    uploadResult.textContent = `上传成功：${data.url}`;
    const imageUrlInput = createForm.querySelector('input[name="image_url"]');
    imageUrlInput.value = data.url;
  } else {
    uploadResult.textContent = `上传失败：${data.error || 'unknown'}`;
  }
});

createForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(createForm);
  const payload = Object.fromEntries(form.entries());
  const res = await fetch('/api/inspirations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.success) {
    createForm.reset();
    await loadList();
  } else {
    alert(`保存失败：${data.error || 'unknown'}`);
  }
});

refreshBtn.addEventListener('click', loadList);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  return escapeHtml(str);
}

loadList();
