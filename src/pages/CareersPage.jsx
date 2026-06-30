import React, { useEffect, useState } from 'react';
import './CareersPage.css';

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
  const [jobs, setJobs] = useState([]);
  
  // Modal & Application Form State
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('1-3 Years');
  const [applicantSummary, setApplicantSummary] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [resumeData, setResumeData] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const savedJobs = localStorage.getItem('nkxus_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      localStorage.setItem('nkxus_jobs', JSON.stringify(INITIAL_JOBS));
      setJobs(INITIAL_JOBS);
    }
  }, []);

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
    setResumeData('');
    setResumeError('');
    setIsSubmitted(false);
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
      setResumeData('');
      return;
    }

    setResumeName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeData(event.target.result); // Base64 data URL
    };
    reader.onerror = () => {
      setResumeError('Error reading file. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPortfolio || !resumeData) {
      if (!resumeData) {
        setResumeError('Please upload your resume file.');
      }
      return;
    }

    const newApplication = {
      id: Date.now(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      name: applicantName,
      email: applicantEmail,
      link: applicantPortfolio,
      experience: applicantExperience,
      summary: applicantSummary,
      resumeName: resumeName,
      resumeData: resumeData,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save application to localStorage
    const savedApps = localStorage.getItem('nkxus_applications');
    const currentApps = savedApps ? JSON.parse(savedApps) : [];
    const updatedApps = [newApplication, ...currentApps];
    localStorage.setItem('nkxus_applications', JSON.stringify(updatedApps));

    setIsSubmitted(true);
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

      {/* JobList */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {jobs.map(job => (
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
                      type="url" 
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

                  <button type="submit" className="modal-submit-btn">
                    Submit Application
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
