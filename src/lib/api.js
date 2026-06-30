const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });
  return parseResponse(response);
}

export async function apiPost(path, body, options = {}) {
  const isFormData = body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: isFormData
      ? { Accept: 'application/json' }
      : { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: isFormData ? body : JSON.stringify(body),
    ...options,
  });
  return parseResponse(response);
}

export async function apiDelete(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  return parseResponse(response);
}

export function storageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
  return `${STORAGE_BASE_URL}/files/${path.replace(/^\/?(storage|files)\/?/, '')}`;
}

export function externalUrl(url) {
  if (!url) return '';
  const trimmedUrl = url.trim();
  if (/^(https?:)?\/\//i.test(trimmedUrl) || /^mailto:/i.test(trimmedUrl)) return trimmedUrl;
  return `https://${trimmedUrl}`;
}

export function calculateReadTime(text = '') {
  return `${Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200))} min read`;
}

export function formatDate(value) {
  if (!value) return 'June 30, 2026';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function mapBlog(blog) {
  const description = blog.description || blog.desc || '';
  return {
    id: blog.id,
    title: blog.title,
    category: blog.category || 'Insight',
    date: formatDate(blog.created_at || blog.date),
    desc: description,
    readTime: blog.readTime || calculateReadTime(description),
    writer: blog.author_name || blog.writer,
    image: storageUrl(blog.image),
  };
}

export function mapJob(job) {
  return {
    id: job.id,
    title: job.job_title || job.title,
    department: job.department || 'General',
    location: job.location || 'Remote',
    type: job.job_type || job.type || 'Full-time',
    experience: job.experience_required || job.experience || '',
  };
}

export function mapApplication(app) {
  const portfolioUrl = app.portfolio_url || app.link || '';
  return {
    id: app.id,
    jobTitle: app.position || app.jobTitle,
    name: app.full_name || app.name,
    email: app.email,
    link: portfolioUrl,
    linkHref: externalUrl(portfolioUrl),
    experience: app.experience,
    summary: app.cover_letter || app.summary,
    resumeName: app.resumeName || (app.resume ? app.resume.split('/').pop() : ''),
    resumeData: app.resumeData || storageUrl(app.resume),
    date: formatDateTime(app.created_at || app.date),
  };
}

export function placeholderBlogImageFile() {
  const bytes = Uint8Array.from(
    atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=='),
    (char) => char.charCodeAt(0)
  );
  return new File([bytes], 'blog-placeholder.png', { type: 'image/png' });
}
