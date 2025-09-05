import React, { useState } from 'react';
import './Pages.css';

const Pages = () => {
  const [staticPages, setStaticPages] = useState([
    { id: 1, title: 'About Me', description: 'Tell your story and connect with readers', status: 'Not Created', content: '' },
    { id: 2, title: 'Contact Me', description: 'Let readers get in touch with you', status: 'Not Created', content: '' },
    { id: 3, title: 'Privacy Policy', description: 'Required for legal compliance', status: 'Not Created', content: '' },
    { id: 4, title: 'Disclaimer', description: 'Protect yourself legally', status: 'Not Created', content: '' }
  ]);

  const [editingPage, setEditingPage] = useState(null);
  const [pageContent, setPageContent] = useState('');

  const getPageTemplate = (title) => {
    const templates = {
      'About Me': `# About Me

Welcome to my blog! I'm [Your Name], a passionate [Your Profession/Interest] based in [Your Location].

## My Story

I started this blog to share my experiences and insights about [Your Topic/Niche]. With [X years] of experience in [Your Field], I've learned valuable lessons that I want to pass on to others.

## What You'll Find Here

- Tips and tutorials about [Topic 1]
- Personal experiences and stories
- Reviews and recommendations
- Industry insights and trends

## My Mission

My goal is to help [Target Audience] achieve [Specific Goal] through practical advice and real-world examples.

## Let's Connect

I love connecting with my readers! Feel free to reach out to me through the contact page or follow me on social media.

Thank you for visiting, and I hope you find value in what I share!`,
      
      'Contact Me': `# Contact Me

I'd love to hear from you! Whether you have questions, feedback, or just want to say hello, don't hesitate to reach out.

## Get In Touch

**Email:** [your-email@example.com]
**Response Time:** I typically respond within 24-48 hours

## What I'd Love to Hear About

- Questions about my blog posts
- Collaboration opportunities
- Guest post proposals
- Feedback and suggestions
- Speaking engagements
- Media inquiries

## Social Media

Connect with me on social media for daily updates and behind-the-scenes content:

- **Twitter:** [@yourusername]
- **LinkedIn:** [Your LinkedIn Profile]
- **Instagram:** [@yourusername]

## Business Inquiries

For business-related inquiries, partnerships, or sponsored content opportunities, please include:

- Brief description of your proposal
- Timeline and deliverables
- Budget range (if applicable)
- Your company/brand information

## Technical Issues

If you're experiencing technical issues with the website, please describe:

- What browser you're using
- What device you're on
- Steps to reproduce the issue
- Screenshots (if helpful)

I appreciate your patience and look forward to connecting with you!`,
      
      'Privacy Policy': `# Privacy Policy

**Last Updated:** [Date]

This Privacy Policy describes how [Your Blog Name] ("we," "our," or "us") collects, uses, and protects your information when you visit our website.

## Information We Collect

### Automatically Collected Information
- IP address and browser information
- Pages visited and time spent on site
- Referring website information
- Device and operating system details

### Information You Provide
- Name and email address (when subscribing or commenting)
- Comments and feedback
- Contact form submissions

## How We Use Your Information

We use collected information to:
- Provide and improve our services
- Send newsletters and updates (with your consent)
- Respond to your inquiries
- Analyze website usage and performance
- Prevent spam and abuse

## Cookies and Tracking

We use cookies to:
- Remember your preferences
- Analyze website traffic
- Provide personalized content

You can disable cookies in your browser settings, though this may affect site functionality.

## Third-Party Services

We may use third-party services such as:
- Google Analytics for website analytics
- Email marketing platforms for newsletters
- Social media plugins

These services have their own privacy policies.

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate information
- Request deletion of your data
- Unsubscribe from communications

## Contact Us

If you have questions about this Privacy Policy, please contact us at [your-email@example.com].

## Changes to This Policy

We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page.`,
      
      'Disclaimer': `# Disclaimer

**Last Updated:** [Date]

The information provided on [Your Blog Name] is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.

## No Professional Advice

The content on this blog is not intended to be a substitute for professional advice. Always seek the advice of qualified professionals regarding any questions you may have.

## External Links

Our blog may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.

## Affiliate Disclosure

This blog may contain affiliate links. If you purchase products through these links, we may earn a small commission at no additional cost to you. We only recommend products we genuinely believe in.

## Personal Opinions

The views and opinions expressed on this blog are purely those of the author and do not necessarily reflect the official policy or position of any other agency, organization, employer, or company.

## Limitation of Liability

Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of this site or reliance on any information provided on the site.

## Accuracy of Information

While we strive to keep the information up to date and correct, we make no representations or warranties about the completeness, accuracy, reliability, suitability, or availability of the website or information.

## Changes to Disclaimer

We reserve the right to update or change our disclaimer at any time without prior notice. Your continued use of the service after we post any modifications constitutes acceptance of those changes.

## Contact Information

If you have any questions about this disclaimer, please contact us at [your-email@example.com].`
    };
    
    return templates[title] || '';
  };

  const createPage = (pageId) => {
    const page = staticPages.find(p => p.id === pageId);
    setEditingPage(page);
    setPageContent(page.content || getPageTemplate(page.title));
  };

  const savePage = () => {
    setStaticPages(staticPages.map(page => 
      page.id === editingPage.id 
        ? { ...page, status: 'Created', content: pageContent }
        : page
    ));
    setEditingPage(null);
    setPageContent('');
  };

  const deletePage = (pageId) => {
    setStaticPages(staticPages.map(page => 
      page.id === pageId 
        ? { ...page, status: 'Not Created', content: '' }
        : page
    ));
  };

  return (
    <div className="pages">
      <div className="container">
        <h1>📄 Pages</h1>
        <p>Create static pages for your blog (About, Contact, Privacy Policy, etc.)</p>

        <div className="pages-grid">
          {staticPages.map((page) => (
            <div key={page.id} className="page-card">
              <h3>{page.title}</h3>
              <p>{page.description}</p>
              <div className="page-status">
                <span className={`status ${page.status === 'Created' ? 'created' : 'not-created'}`}>
                  {page.status}
                </span>
              </div>
              <div className="page-actions">
                {page.status === 'Created' ? (
                  <>
                    <button 
                      onClick={() => createPage(page.id)} 
                      className="btn btn-secondary"
                    >
                      Edit Page
                    </button>
                    <button 
                      onClick={() => deletePage(page.id)} 
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => createPage(page.id)} 
                    className="btn btn-primary"
                  >
                    Create Page
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {editingPage && (
          <div className="page-editor">
            <h2>✏️ {editingPage.status === 'Created' ? 'Edit' : 'Create'} {editingPage.title}</h2>
            <div className="editor-form">
              <textarea
                value={pageContent}
                onChange={(e) => setPageContent(e.target.value)}
                placeholder={`Write your ${editingPage.title} content here...`}
                rows="15"
                className="page-textarea"
              />
              <div className="editor-actions">
                <button onClick={savePage} className="btn btn-primary">
                  💾 Save Page
                </button>
                <button 
                  onClick={() => {
                    setEditingPage(null);
                    setPageContent('');
                  }} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="page-tips">
          <h2>💡 Page Tips</h2>
          <ul>
            <li><strong>About Me:</strong> Share your background, interests, and why you started blogging</li>
            <li><strong>Contact:</strong> Provide email, social media links, or contact form</li>
            <li><strong>Privacy Policy:</strong> Required if you use cookies or collect user data</li>
            <li><strong>Disclaimer:</strong> Protects you from liability for advice or opinions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pages;