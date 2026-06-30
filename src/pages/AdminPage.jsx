import React, { useEffect, useState } from 'react';
import {
  apiDelete,
  apiGet,
  apiPost,
  mapApplication,
  mapBlog,
  mapJob,
  placeholderBlogImageFile,
} from '../lib/api';
import Pagination from '../components/Pagination';
import './AdminPage.css';

const PAGE_SIZE = 5;

function paginate(items, currentPage) {
  const start = (currentPage - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

function totalPages(count) {
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState({
    blogs: 1,
    careers: 1,
    applications: 1,
    contacts: 1,
  });

  const [blogTitle, setBlogTitle] = useState('');
  const [blogParagraph, setBlogParagraph] = useState('');
  const [blogWriter, setBlogWriter] = useState('');
  const [blogCategory, setBlogCategory] = useState('Insight');
  const [blogImage, setBlogImage] = useState(null);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDepartment, setJobDepartment] = useState('Engineering');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobExperience, setJobExperience] = useState('');

  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  const showStatus = (text, type = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: '', type: '' });
    }, 4000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;

    async function loadDashboardData() {
      try {
        const [blogData, jobData, applicationData, contactData] = await Promise.all([
          apiGet('/blogs'),
          apiGet('/jobs'),
          apiGet('/careers'),
          apiGet('/contacts'),
        ]);

        if (!cancelled) {
          setBlogs(blogData.map(mapBlog));
          setJobs(jobData.map(mapJob));
          setApplications(applicationData.map(mapApplication));
          setContacts(contactData);
        }
      } catch (err) {
        if (!cancelled) showStatus(`Unable to load backend data: ${err.message}`, 'error');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPages(prev => ({
      blogs: Math.min(prev.blogs, totalPages(blogs.length)),
      careers: Math.min(prev.careers, totalPages(jobs.length)),
      applications: Math.min(prev.applications, totalPages(applications.length)),
      contacts: Math.min(prev.contacts, totalPages(contacts.length)),
    }));
  }, [blogs.length, jobs.length, applications.length, contacts.length]);

  const setPage = (tab, page) => {
    setPages(prev => ({ ...prev, [tab]: page }));
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!blogTitle || !blogParagraph || !blogWriter) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('description', blogParagraph);
    formData.append('author_name', blogWriter);
    formData.append('category', blogCategory);
    formData.append('image', blogImage || placeholderBlogImageFile());

    try {
      const response = await apiPost('/blogs', formData);
      setBlogs([mapBlog(response.data), ...blogs]);
      setPage('blogs', 1);
      setBlogTitle('');
      setBlogParagraph('');
      setBlogWriter('');
      setBlogCategory('Insight');
      setBlogImage(null);
      showStatus('Blog post successfully published!');
    } catch (err) {
      showStatus(`Unable to publish blog post: ${err.message}`, 'error');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await apiDelete(`/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
      showStatus('Blog post successfully removed.', 'info');
    } catch (err) {
      showStatus(`Unable to remove blog post: ${err.message}`, 'error');
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobTitle || !jobLocation) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    try {
      const response = await apiPost('/jobs', {
        job_title: jobTitle,
        department: jobDepartment,
        location: jobLocation,
        job_type: jobType,
        experience_required: jobExperience || 'No experience requirement',
      });
      setJobs([mapJob(response.data), ...jobs]);
      setPage('careers', 1);
      setJobTitle('');
      setJobLocation('');
      setJobExperience('');
      setJobDepartment('Engineering');
      setJobType('Full-time');
      showStatus('Job listing successfully added!');
    } catch (err) {
      showStatus(`Unable to add job listing: ${err.message}`, 'error');
    }
  };

  const pagedBlogs = paginate(blogs, pages.blogs);
  const pagedJobs = paginate(jobs, pages.careers);
  const pagedApplications = paginate(applications, pages.applications);
  const pagedContacts = paginate(contacts, pages.contacts);

  const handleDeleteJob = async (id) => {
    try {
      await apiDelete(`/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
      showStatus('Job listing successfully removed.', 'info');
    } catch (err) {
      showStatus(`Unable to remove job listing: ${err.message}`, 'error');
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      await apiDelete(`/careers/${id}`);
      setApplications(applications.filter(app => app.id !== id));
      showStatus('Job application successfully archived.', 'info');
    } catch (err) {
      showStatus(`Unable to archive job application: ${err.message}`, 'error');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await apiDelete(`/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
      showStatus('Contact inquiry successfully archived.', 'info');
    } catch (err) {
      showStatus(`Unable to archive contact inquiry: ${err.message}`, 'error');
    }
  };

  return (
    <div className="admin-page-container">
      <header className="admin-header">
        <span className="admin-subtitle">INTERNAL SYSTEM CONTROL</span>
        <h1 className="admin-title">NKXUS <span className="text-gradient">Console.</span></h1>
        <p className="admin-description">
          Add, modify, or remove dynamic content across career listings, journal entries, contact leads, and job applications.
        </p>
      </header>

      <div className="admin-tabs">
        <button className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
          Blogs Management
        </button>
        <button className={`admin-tab-btn ${activeTab === 'careers' ? 'active' : ''}`} onClick={() => setActiveTab('careers')}>
          Careers Management
        </button>
        <button className={`admin-tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          Job Applications ({applications.length})
        </button>
        <button className={`admin-tab-btn ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>
          Contacts ({contacts.length})
        </button>
      </div>

      {statusMessage.text && (
        <div className={`status-banner ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      <div className="admin-workspace">
        {isLoading && <p className="admin-loading">Loading backend data...</p>}

        {activeTab === 'blogs' && (
          <div className="admin-section">
            <div className="admin-grid">
              <div className="admin-card form-card">
                <h2>Publish New Blog</h2>
                <form onSubmit={handleAddBlog}>
                  <div className="form-group">
                    <label>Blog Title *</label>
                    <input type="text" placeholder="e.g. Scaling React Virtualized Grids" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>Writer Name *</label>
                    <input type="text" placeholder="e.g. John Doe, Lead Architect" value={blogWriter} onChange={(e) => setBlogWriter(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)}>
                      <option value="Insight">Insight</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design Philosophy">Design Philosophy</option>
                      <option value="Aesthetics">Aesthetics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Paragraph/Content *</label>
                    <textarea placeholder="Write your blog contents here..." rows="6" value={blogParagraph} onChange={(e) => setBlogParagraph(e.target.value)} required></textarea>
                  </div>

                  <div className="form-group">
                    <label>Blog Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setBlogImage(e.target.files[0] || null)} />
                    <span className="field-help">Optional. A small placeholder is sent if no image is selected.</span>
                  </div>

                  <button type="submit" className="admin-submit-btn">Publish Blog Post</button>
                </form>
              </div>

              <div className="admin-card list-card">
                <h2>Active Blogs ({blogs.length})</h2>
                <div className="items-list">
                  {blogs.length === 0 ? (
                    <p className="no-items">No active blogs. Publish one to get started.</p>
                  ) : (
                    pagedBlogs.map(blog => (
                      <div key={blog.id} className="list-item">
                        {blog.image && (
                          <img className="blog-list-thumb" src={blog.image} alt={blog.title} />
                        )}
                        <div className="item-info">
                          <h4>{blog.title}</h4>
                          <p className="item-meta">By {blog.writer || 'Unknown'} | {blog.category} | {blog.date}</p>
                          <p className="item-snippet">{blog.desc.substring(0, 100)}...</p>
                        </div>
                        <button className="delete-item-btn" onClick={() => handleDeleteBlog(blog.id)} title="Remove Post">
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <Pagination
                  totalItems={blogs.length}
                  currentPage={pages.blogs}
                  onPageChange={(page) => setPage('blogs', page)}
                  pageSize={PAGE_SIZE}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'careers' && (
          <div className="admin-section">
            <div className="admin-grid">
              <div className="admin-card form-card">
                <h2>Create Career Listing</h2>
                <form onSubmit={handleAddJob}>
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input type="text" placeholder="e.g. Lead Frontend Architect" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>Location *</label>
                    <input type="text" placeholder="e.g. Hyderabad / Hybrid or Remote" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} required />
                  </div>

                  <div className="form-group">
                    <label>Experience Required</label>
                    <input type="text" placeholder="e.g. 3+ Years or Senior Level" value={jobExperience} onChange={(e) => setJobExperience(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Department</label>
                    <select value={jobDepartment} onChange={(e) => setJobDepartment(e.target.value)}>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Growth">Growth</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job Type</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <button type="submit" className="admin-submit-btn">Post Job Listing</button>
                </form>
              </div>

              <div className="admin-card list-card">
                <h2>Active Listings ({jobs.length})</h2>
                <div className="items-list">
                  {jobs.length === 0 ? (
                    <p className="no-items">No active listings. Create one to get started.</p>
                  ) : (
                    pagedJobs.map(job => (
                      <div key={job.id} className="list-item">
                        <div className="item-info">
                          <h4>{job.title}</h4>
                          <p className="item-meta">{job.department} | {job.type} | {job.location} {job.experience && `| ${job.experience}`}</p>
                        </div>
                        <button className="delete-item-btn" onClick={() => handleDeleteJob(job.id)} title="Remove Listing">
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <Pagination
                  totalItems={jobs.length}
                  currentPage={pages.careers}
                  onPageChange={(page) => setPage('careers', page)}
                  pageSize={PAGE_SIZE}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="admin-section">
            <div className="admin-card full-width-card">
              <h2>Job Applications Received ({applications.length})</h2>
              <div className="applications-list">
                {applications.length === 0 ? (
                  <p className="no-items">No applications received yet.</p>
                ) : (
                  pagedApplications.map(app => (
                    <div key={app.id} className="application-item">
                      <div className="app-main-details">
                        <div className="app-title-row">
                          <h3>{app.name}</h3>
                          <span className="app-job-tag">{app.jobTitle}</span>
                          <span className="app-date-tag">Submitted: {app.date}</span>
                        </div>

                        <div className="app-info-grid">
                          <div className="app-info-col">
                            <span className="app-info-label">Email</span>
                            <a href={`mailto:${app.email}`} className="app-link" title={app.email}>{app.email}</a>
                          </div>

                          <div className="app-info-col">
                            <span className="app-info-label">Portfolio / LinkedIn</span>
                            <a href={app.linkHref} target="_blank" rel="noopener noreferrer" className="app-link" title={app.link}>{app.link}</a>
                          </div>

                          <div className="app-info-col">
                            <span className="app-info-label">Experience</span>
                            <span className="app-info-value">{app.experience}</span>
                          </div>

                          <div className="app-info-col">
                            <span className="app-info-label">Resume Document</span>
                            {app.resumeData ? (
                              <a href={app.resumeData} download={app.resumeName || 'resume.pdf'} className="app-resume-link" title={app.resumeName || 'Download Resume'}>
                                {app.resumeName || 'Download Resume'}
                              </a>
                            ) : (
                              <span style={{ color: 'var(--text-muted)' }}>None uploaded</span>
                            )}
                          </div>
                        </div>

                        {app.summary && (
                          <div className="app-summary-box">
                            <h5>Applicant Cover Letter / Summary</h5>
                            <p>{app.summary}</p>
                          </div>
                        )}
                      </div>
                      <button className="delete-item-btn archive-btn" onClick={() => handleDeleteApplication(app.id)} title="Archive Application">
                        Archive
                      </button>
                    </div>
                  ))
                )}
              </div>
              <Pagination
                totalItems={applications.length}
                currentPage={pages.applications}
                onPageChange={(page) => setPage('applications', page)}
                pageSize={PAGE_SIZE}
              />
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="admin-section">
            <div className="admin-card full-width-card">
              <h2>Contact Inquiries ({contacts.length})</h2>
              <div className="applications-list">
                {contacts.length === 0 ? (
                  <p className="no-items">No contact inquiries received yet.</p>
                ) : (
                  pagedContacts.map(contact => (
                    <div key={contact.id} className="application-item">
                      <div className="app-main-details">
                        <div className="app-title-row">
                          <h3>{contact.name}</h3>
                          <span className="app-date-tag">
                            Submitted: {contact.created_at ? new Date(contact.created_at).toLocaleString() : 'Recently'}
                          </span>
                        </div>

                        <div className="app-info-grid">
                          <div className="app-info-col">
                            <span className="app-info-label">Email</span>
                            <a href={`mailto:${contact.email}`} className="app-link" title={contact.email}>{contact.email}</a>
                          </div>
                        </div>

                        <div className="app-summary-box">
                          <h5>Message</h5>
                          <p>{contact.message}</p>
                        </div>
                      </div>
                      <button className="delete-item-btn archive-btn" onClick={() => handleDeleteContact(contact.id)} title="Archive Contact">
                        Archive
                      </button>
                    </div>
                  ))
                )}
              </div>
              <Pagination
                totalItems={contacts.length}
                currentPage={pages.contacts}
                onPageChange={(page) => setPage('contacts', page)}
                pageSize={PAGE_SIZE}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
