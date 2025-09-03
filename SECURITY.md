# 🔒 Security Policy

## 📋 **Supported Versions**

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## 🚨 **Reporting Security Vulnerabilities**

We take security seriously. If you discover a security vulnerability, please follow these steps:

### **Do NOT**

- ❌ Open a public GitHub issue
- ❌ Discuss the vulnerability publicly
- ❌ Share details on social media

### **Do**

- ✅ Email us privately through GitHub
- ✅ Provide detailed information
- ✅ Allow reasonable time for response
- ✅ Work with us on coordinated disclosure

### **What to Include**

1. **Description** - Clear explanation of the vulnerability
2. **Impact** - Potential security impact and affected components
3. **Reproduction** - Step-by-step instructions to reproduce
4. **Proof of Concept** - If applicable, include PoC code
5. **Suggested Fix** - If you have ideas for mitigation

## 🛡️ **Security Measures**

### **Authentication & Authorization**

- **JWT Tokens** - Secure authentication with configurable expiry
- **Password Hashing** - Argon2 for secure password storage
- **Role-based Access** - Admin vs Cashier permissions
- **Session Management** - Secure token handling

### **Data Protection**

- **HMAC Signatures** - Tamper-proof vouchers and codes
- **Input Validation** - Zod schema validation on all endpoints
- **SQL Injection Prevention** - Prisma ORM with prepared statements
- **XSS Protection** - Sanitized outputs and CSP headers

### **Network Security**

- **CORS Configuration** - Restricted origins
- **Rate Limiting** - 100 requests per minute per IP
- **Webhook Verification** - X-Hub-Signature-256 validation
- **HTTPS Enforcement** - TLS 1.2+ in production

### **Infrastructure Security**

- **Environment Variables** - Secrets stored securely
- **Docker Security** - Non-root containers
- **Database Security** - Connection encryption
- **Logging** - Security events logged (without sensitive data)

## 🔐 **Security Best Practices**

### **For Developers**

1. **Never commit secrets** - Use .env files (excluded from Git)
2. **Validate all inputs** - Use Zod schemas consistently
3. **Use parameterized queries** - Let Prisma handle SQL injection prevention
4. **Hash passwords properly** - Use Argon2 with proper salt
5. **Implement proper error handling** - Don't leak sensitive information

### **For Deployment**

1. **Use strong secrets** - Generate cryptographically secure tokens
2. **Enable HTTPS** - Use TLS certificates in production
3. **Configure firewalls** - Restrict access to necessary ports only
4. **Monitor logs** - Set up security event monitoring
5. **Regular updates** - Keep dependencies up to date

### **For Operations**

1. **Backup encryption** - Encrypt database backups
2. **Access control** - Limit administrative access
3. **Audit trails** - Maintain logs of administrative actions
4. **Incident response** - Have a plan for security incidents

## 🔍 **Security Checklist**

### **Before Deployment**

- [ ] All secrets moved to environment variables
- [ ] Strong JWT secret configured (32+ characters)
- [ ] Admin password changed from default
- [ ] WABA webhook signature verification enabled
- [ ] CORS origins configured for production
- [ ] Rate limiting enabled and tested
- [ ] HTTPS configured with valid certificates
- [ ] Database connections encrypted
- [ ] Error messages don't leak sensitive information
- [ ] Security headers configured (CSP, HSTS, etc.)

### **Regular Maintenance**

- [ ] Dependencies updated monthly
- [ ] Security logs reviewed weekly
- [ ] Access permissions audited quarterly
- [ ] Penetration testing annually
- [ ] Backup integrity verified monthly

## 🚨 **Known Security Considerations**

### **WhatsApp Integration**

- Webhook signature verification is critical
- Store WABA tokens securely
- Validate all incoming message data
- Implement rate limiting for webhooks

### **Voucher System**

- HMAC signatures prevent tampering
- Time-based expiry prevents replay attacks
- Unique codes prevent duplicate redemption
- Staff authorization required for redemption

### **Admin Panel**

- JWT tokens have reasonable expiry
- Role-based access controls
- CSRF protection on state-changing operations
- Secure session management

## 📞 **Security Contact**

For security-related inquiries:

- **GitHub Issues**: For general security questions (non-sensitive)
- **Private Contact**: Use GitHub's private vulnerability reporting feature

## 🔄 **Security Update Process**

1. **Assessment** - We assess the severity and impact
2. **Development** - We develop and test a fix
3. **Disclosure** - We coordinate disclosure timeline
4. **Release** - We release the security update
5. **Notification** - We notify users of the update

## 📚 **Security Resources**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Docker Security](https://docs.docker.com/engine/security/)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)

---

**Security is everyone's responsibility. Thank you for helping keep Teddy & Friends safe! 🛡️**
