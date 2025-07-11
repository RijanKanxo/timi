# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Timi Chat seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to [security@yourdomain.com](mailto:security@yourdomain.com) with the following information:

- A description of the vulnerability
- Steps to reproduce the issue
- Possible impact of the vulnerability
- Any potential mitigations you've identified

### What to Expect

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide an estimated timeline for addressing the vulnerability within 5 business days
- We will keep you informed of our progress throughout the process
- We will credit you in our security advisory (unless you prefer to remain anonymous)

### Security Best Practices

When using Timi Chat:

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Store sensitive data in environment variables
3. **HTTPS**: Always use HTTPS in production
4. **Dependencies**: Keep dependencies updated
5. **Input Validation**: Be cautious with user inputs

### Security Features

- No user data is stored on servers (client-side only)
- API keys are only used for direct API calls
- No third-party tracking or analytics by default
- Open source code for transparency

### Responsible Disclosure

We kindly ask that you:

- Give us reasonable time to address the issue before disclosing it publicly
- Do not access or modify data that doesn't belong to you
- Do not disrupt our service or other users
- Do not perform testing on our production systems

Thank you for helping keep Timi Chat and our users safe!
