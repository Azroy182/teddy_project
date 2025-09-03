# 🤝 Contributing to Teddy & Friends

Thank you for your interest in contributing to the Teddy & Friends WhatsApp bot project!

## 📋 **Development Setup**

### **Prerequisites**

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- Git with SSH keys configured

### **Local Development**

```bash
# 1. Fork and clone
git clone git@github.com:YOUR_USERNAME/teddy_project.git
cd teddy_project

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp env.example .env
# Edit .env with your local settings

# 4. Start infrastructure
docker-compose up -d db redis

# 5. Setup database
pnpm db:migrate
pnpm db:seed

# 6. Start development servers
pnpm dev
```

## 🔄 **Development Workflow**

### **1. Create Feature Branch**

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### **2. Make Changes**

- Follow TypeScript best practices
- Write tests for new functionality
- Update documentation if needed
- Follow existing code patterns

### **3. Test Your Changes**

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Unit tests
pnpm test

# Build verification
pnpm build
```

### **4. Commit Changes**

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples
git commit -m "feat(waba): add subscription management"
git commit -m "fix(loyalty): prevent duplicate visit counting"
git commit -m "docs: update API documentation"
git commit -m "test: add voucher generation tests"
```

### **5. Create Pull Request**

- Push your branch: `git push origin feature/your-feature-name`
- Create PR on GitHub
- Fill out the PR template
- Link related issues

## 📝 **Code Style**

### **TypeScript Guidelines**

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use Zod for runtime validation
- Document complex business logic

### **NestJS Patterns**

- Use dependency injection properly
- Create separate services for business logic
- Use DTOs with Zod validation
- Implement proper error handling

### **Next.js Conventions**

- Use App Router (not Pages Router)
- Implement proper SEO metadata
- Use Server Components where possible
- Follow React best practices

## 🧪 **Testing Guidelines**

### **Unit Tests**

- Test business logic thoroughly
- Mock external dependencies
- Use descriptive test names
- Aim for >80% coverage

### **Integration Tests**

- Test API endpoints
- Test database operations
- Verify error handling
- Test authentication flows

### **E2E Tests**

- Test complete user journeys
- Test admin workflows
- Verify WhatsApp integration
- Test loyalty program flow

## 🏗️ **Architecture Decisions**

### **Technology Choices**

- **NestJS**: Robust backend framework with excellent TypeScript support
- **Next.js**: Modern React framework with great developer experience
- **Prisma**: Type-safe database access with excellent migrations
- **PostgreSQL**: Reliable relational database for complex business logic
- **Redis**: Fast caching and session storage
- **BullMQ**: Reliable job queue for background processing

### **Design Patterns**

- **Repository Pattern**: Database access through services
- **Factory Pattern**: WhatsApp client implementations
- **Observer Pattern**: Event-driven voucher generation
- **Strategy Pattern**: Multiple payment providers

## 🔒 **Security Considerations**

### **Authentication**

- JWT tokens with reasonable expiry
- Secure password hashing (argon2)
- Role-based access control

### **Data Protection**

- HMAC signatures for vouchers
- Input validation on all endpoints
- Rate limiting on public endpoints
- Secure webhook verification

### **Best Practices**

- Never commit secrets to Git
- Use environment variables for configuration
- Validate all user inputs
- Log security events

## 📊 **Performance Guidelines**

### **Database**

- Use indexes for frequently queried columns
- Implement pagination for large datasets
- Use transactions for multi-step operations
- Monitor query performance

### **API**

- Implement response caching where appropriate
- Use compression for large responses
- Monitor response times
- Implement graceful error handling

### **Frontend**

- Optimize bundle sizes
- Use lazy loading for routes
- Implement proper loading states
- Cache API responses

## 🐛 **Bug Reports**

### **Before Reporting**

1. Check existing issues
2. Verify it's reproducible
3. Test with latest version
4. Gather relevant information

### **Issue Template**

```markdown
**Bug Description**
Clear description of what's wrong

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Environment**
- OS: [e.g., Windows 10]
- Node version: [e.g., 20.10.0]
- Browser: [e.g., Chrome 120]

**Additional Context**
Screenshots, logs, etc.
```

## 💡 **Feature Requests**

### **Request Template**

```markdown
**Feature Description**
Clear description of the proposed feature

**Business Justification**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Mockups, examples, etc.
```

## 🎯 **Roadmap**

### **Current Sprint**
- PNG image generation improvements
- Admin panel UX enhancements
- Background job processing

### **Next Sprint**
- Payment integration (MBWay)
- Advanced analytics dashboard
- Mobile app considerations

### **Future**
- Multi-location support
- Advanced reporting
- API rate limiting improvements

---

## 🙏 **Acknowledgments**

- **NestJS Team** - Amazing backend framework
- **Next.js Team** - Excellent React framework
- **Prisma Team** - Best-in-class database toolkit
- **Teddy & Friends** - Business vision and requirements

---

**Happy coding! 🚀**
