import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, externalUrl, mapJob } from '../lib/api';
import Pagination from '../components/Pagination';
import './CareersPage.css';

const PAGE_SIZE = 5;

const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Architect',
    department: 'Engineering',
    location: 'Hyderabad / Hybrid',
    type: 'Full-time',
    experience: '5+ Years'
  },
  {
    id: 2,
    title: 'Prestige UX/UI Designer',
    department: 'Design',
    location: 'Bangalore / Hybrid',
    type: 'Full-time',
    experience: '3-5 Years'
  },
  {
    id: 3,
    title: 'Growth Marketing Strategist',
    department: 'Growth',
    location: 'Remote (India)',
    type: 'Full-time',
    experience: '2+ Years'
  }
];

export default function CareersPage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal & Application Form State
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('1-3 Years');
  const [applicantSummary, setApplicantSummary] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    let cancelled = false;

    async function loadJobs() {
      try {
        const data = await apiGet('/jobs');
        if (!cancelled) {
          setJobs(data.length ? data.map(mapJob) : INITIAL_JOBS);
          setJobsError('');
        }
      } catch {
        if (!cancelled) {
          setJobs(INITIAL_JOBS);
          setJobsError('Showing sample roles while the backend is unavailable.');
        }
      } finally {
        if (!cancelled) setLoadingJobs(false);
      }
    }

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
    setCurrentPage(page => Math.min(page, totalPages));
  }, [jobs.length]);

  const pagedJobs = jobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPortfolio('');
    setApplicantExperience('1-3 Years');
    setApplicantSummary('');
    setResumeName('');
    setResumeFile(null);
    setResumeError('');
    setIsSubmitted(false);
    setSubmitError('');
    setIsSubmitting(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeError('');
    if (!file) return;

    // Validate size (< 1.5MB to easily fit in LocalStorage)
    if (file.size > 1500000) {
      setResumeError('File size is too large (max 1.5MB). Please upload a smaller document.');
      e.target.value = ''; // Reset input
      setResumeName('');
      setResumeFile(null);
      return;
    }

    setResumeName(file.name);
    setResumeFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPortfolio || !resumeFile) {
      if (!resumeFile) {
        setResumeError('Please upload your resume file.');
      }
      return;
    }

    const formData = new FormData();
    formData.append('position', selectedJob.title);
    formData.append('full_name', applicantName);
    formData.append('email', applicantEmail);
    formData.append('portfolio_url', externalUrl(applicantPortfolio));
    formData.append('experience', applicantExperience);
    formData.append('resume', resumeFile);
    formData.append('cover_letter', applicantSummary);

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await apiPost('/careers', formData);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      padding: '160px 24px 100px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)',
      background: 'var(--bg-primary)',
      minHeight: '80vh'
    }}>
      {/* Header */}
      <header style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)'
        }}>WE ARE HIRING</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          Shape the Future of <br />
          <span className="text-gradient">Digital Architecture.</span>
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Join a team of elite engineers and designers crafting the digital frameworks of tomorrow. We value precision, luxury aesthetics, and clean execution.
        </p>
      </header>

      {jobsError && (
        <p style={{ color: '#f59e0b', textAlign: 'center', fontSize: '14px', marginTop: '-48px', marginBottom: '40px' }}>
          {jobsError}
        </p>
      )}

      {/* JobList */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {loadingJobs ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Loading open roles...</p>
        ) : pagedJobs.map(job => (
          <div key={job.id} style={{
            padding: '32px',
            borderRadius: '16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            transition: 'border-color 0.3s ease, transform 0.3s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = 'none';
          }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                {(job.department || 'General').toUpperCase()} / {(job.type || 'Full-time').toUpperCase()} {job.experience && `/ ${job.experience.toUpperCase()}`}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>{job.title}</h3>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>{job.location || 'Remote'}</span>
            </div>
            <button 
              onClick={() => handleApplyClick(job)}
              style={{
                padding: '12px 24px',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              onMouseOver={e => e.target.style.opacity = '0.9'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              Apply Now
            </button>
          </div>
        ))}
      </section>
      {!loadingJobs && (
        <Pagination
          totalItems={jobs.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={PAGE_SIZE}
        />
      )}

      {/* Application Form Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
              &times;
            </button>

            {!isSubmitted ? (
              <>
                <header className="modal-header">
                  <h2 className="modal-title">Join the Collective</h2>
                  <span className="modal-subtitle">
                    Applying for: <strong>{selectedJob.title}</strong>
                  </span>
                </header>

                <form onSubmit={handleFormSubmit}>
                  {submitError && <p className="modal-error">{submitError}</p>}
                  <div className="app-form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alexander Mercer"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="app-form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="e.g. alex@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="app-form-group">
                    <label>Portfolio / LinkedIn URL *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://portfolio.domain or linkedin.com/in/username"
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      required
                    />
                  </div>

                  <div className="app-form-group">
                    <label>Professional Experience</label>
                    <select 
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                    >
                      <option value="Entry Level">Entry Level (&lt; 1 Year)</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="Senior Level">Senior Level (5+ Years)</option>
                    </select>
                  </div>

                  <div className="app-form-group">
                    <label>Resume File * (.pdf, .doc, .docx, max 1.5MB)</label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                    {resumeError && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{resumeError}</span>}
                    {resumeName && <span style={{ color: '#10b981', fontSize: '12px', marginTop: '4px' }}>Selected: {resumeName}</span>}
                  </div>

                  <div className="app-form-group">
                    <label>Cover Letter / Professional Summary</label>
                    <textarea 
                      placeholder="Tell us about your background and alignment with NKXUS' elite engineering standards..."
                      rows="4"
                      value={applicantSummary}
                      onChange={(e) => setApplicantSummary(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon-wrap">&#10003;</div>
                <h3>Application Queue Active</h3>
                <p>
                  Thank you, <strong>{applicantName}</strong>. Your profile has been queued for review for the <strong>{selectedJob.title}</strong> position. Our talent acquisition team will align with your schedule shortly.
                </p>
                <button className="success-close-btn" onClick={closeModal}>
                  Close Console
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
