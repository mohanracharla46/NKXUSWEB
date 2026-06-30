import React, { useState, useEffect } from 'react';
import './AdminPage.css';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogParagraph, setBlogParagraph] = useState('');
  const [blogWriter, setBlogWriter] = useState('');
  const [blogCategory, setBlogCategory] = useState('Insight');

  // Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobDepartment, setJobDepartment] = useState('Engineering');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobExperience, setJobExperience] = useState('');

  // Status message
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load current data
    const savedBlogs = localStorage.getItem('nkxus_blogs');
    const savedJobs = localStorage.getItem('nkxus_jobs');
    const savedApps = localStorage.getItem('nkxus_applications');

    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  const showStatus = (text, type = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: '', type: '' });
    }, 4000);
  };

  // Add Blog Handler
  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!blogTitle || !blogParagraph || !blogWriter) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const newBlog = {
      id: Date.now(),
      title: blogTitle,
      desc: blogParagraph,
      writer: blogWriter,
      category: blogCategory,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: `${Math.max(1, Math.ceil(blogParagraph.split(' ').length / 200))} min read`
    };

    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem('nkxus_blogs', JSON.stringify(updatedBlogs));

    // Reset Form
    setBlogTitle('');
    setBlogParagraph('');
    setBlogWriter('');
    setBlogCategory('Insight');

    showStatus('Blog post successfully published!');
  };

  // Delete Blog Handler
  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('nkxus_blogs', JSON.stringify(updatedBlogs));
    showStatus('Blog post successfully removed.', 'info');
  };

  // Add Job Handler
  const handleAddJob = (e) => {
    e.preventDefault();
    if (!jobTitle || !jobLocation) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const newJob = {
      id: Date.now(),
      title: jobTitle,
      department: jobDepartment,
      location: jobLocation,
      type: jobType,
      experience: jobExperience || 'No experience requirement'
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('nkxus_jobs', JSON.stringify(updatedJobs));

    // Reset Form
    setJobTitle('');
    setJobLocation('');
    setJobExperience('');
    setJobDepartment('Engineering');
    setJobType('Full-time');

    showStatus('Job listing successfully added!');
  };

  // Delete Job Handler
  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('nkxus_jobs', JSON.stringify(updatedJobs));
    showStatus('Job listing successfully removed.', 'info');
  };

  // Delete Application Handler
  const handleDeleteApplication = (id) => {
    const updatedApps = applications.filter(app => app.id !== id);
    setApplications(updatedApps);
    localStorage.setItem('nkxus_applications', JSON.stringify(updatedApps));
    showStatus('Job application successfully archived.', 'info');
  };

  return (
    <div className="admin-page-container">
      <header className="admin-header">
        <span className="admin-subtitle">INTERNAL SYSTEM CONTROL</span>
        <h1 className="admin-title">NKXUS <span className="text-gradient">Console.</span></h1>
        <p className="admin-description">
          Add, modify, or remove dynamic content across career listings, journal entries, and job applications.
        </p>
      </header>

      {/* Tabs Selector */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          Blogs Management
        </button>
        <button 
          className={`admin-tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
          onClick={() => setActiveTab('careers')}
        >
          Careers Management
        </button>
        <button 
          className={`admin-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Job Applications ({applications.length})
        </button>
      </div>

      {/* Status Messages */}
      {statusMessage.text && (
        <div className={`status-banner ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      {/* Content Area */}
      <div className="admin-workspace">
        {activeTab === 'blogs' && (
          <div className="admin-section">
            <div className="admin-grid">
              {/* Add Blog Form */}
              <div className="admin-card form-card">
                <h2>Publish New Blog</h2>
                <form onSubmit={handleAddBlog}>
                  <div className="form-group">
                    <label>Blog Title *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Scaling React Virtualized Grids"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Writer Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe, Lead Architect"
                      value={blogWriter}
                      onChange={(e) => setBlogWriter(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                    >
                      <option value="Insight">Insight</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design Philosophy">Design Philosophy</option>
                      <option value="Aesthetics">Aesthetics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Paragraph/Content *</label>
                    <textarea 
                      placeholder="Write your blog contents here..."
                      rows="6"
                      value={blogParagraph}
                      onChange={(e) => setBlogParagraph(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="admin-submit-btn">Publish Blog Post</button>
                </form>
              </div>

              {/* Blogs List */}
              <div className="admin-card list-card">
                <h2>Active Blogs ({blogs.length})</h2>
                <div className="items-list">
                  {blogs.length === 0 ? (
                    <p className="no-items">No active blogs. Publish one to get started.</p>
                  ) : (
                    blogs.map(blog => (
                      <div key={blog.id} className="list-item">
                        <div className="item-info">
                          <h4>{blog.title}</h4>
                          <p className="item-meta">By {blog.writer || 'Unknown'} • {blog.category} • {blog.date}</p>
                          <p className="item-snippet">{blog.desc.substring(0, 100)}...</p>
                        </div>
                        <button 
                          className="delete-item-btn"
                          onClick={() => handleDeleteBlog(blog.id)}
                          title="Remove Post"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'careers' && (
          <div className="admin-section">
            <div className="admin-grid">
              {/* Add Job Form */}
              <div className="admin-card form-card">
                <h2>Create Career Listing</h2>
                <form onSubmit={handleAddJob}>
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Lead Frontend Architect"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Location *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Hyderabad / Hybrid or Remote"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Experience Required</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 3+ Years or Senior Level"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Department</label>
                    <select 
                      value={jobDepartment}
                      onChange={(e) => setJobDepartment(e.target.value)}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Growth">Growth</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job Type</label>
                    <select 
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <button type="submit" className="admin-submit-btn">Post Job Listing</button>
                </form>
              </div>

              {/* Jobs List */}
              <div className="admin-card list-card">
                <h2>Active Listings ({jobs.length})</h2>
                <div className="items-list">
                  {jobs.length === 0 ? (
                    <p className="no-items">No active listings. Create one to get started.</p>
                  ) : (
                    jobs.map(job => (
                      <div key={job.id} className="list-item">
                        <div className="item-info">
                          <h4>{job.title}</h4>
                          <p className="item-meta">{job.department} • {job.type} • {job.location} {job.experience && `• ${job.experience}`}</p>
                        </div>
                        <button 
                          className="delete-item-btn"
                          onClick={() => handleDeleteJob(job.id)}
                          title="Remove Listing"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
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
                  applications.map(app => (
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
                            <a href={`mailto:${app.email}`} className="app-link">{app.email}</a>
                          </div>
                          
                          <div className="app-info-col">
                            <span className="app-info-label">Portfolio / LinkedIn</span>
                            <a href={app.link} target="_blank" rel="noopener noreferrer" className="app-link">{app.link}</a>
                          </div>
                          
                          <div className="app-info-col">
                            <span className="app-info-label">Experience</span>
                            <span className="app-info-value">{app.experience}</span>
                          </div>
                          
                          <div className="app-info-col">
                            <span className="app-info-label">Resume Document</span>
                            {app.resumeData ? (
                              <a href={app.resumeData} download={app.resumeName || 'resume.pdf'} className="app-resume-link">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                  <line x1="16" y1="13" x2="8" y2="13"></line>
                                  <line x1="16" y1="17" x2="8" y2="17"></line>
                                  <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
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
                      <button 
                        className="delete-item-btn archive-btn"
                        onClick={() => handleDeleteApplication(app.id)}
                        title="Archive Application"
                      >
                        Archive
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
