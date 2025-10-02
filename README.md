# Automation Assignment - Playwright TypeScript Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript, featuring multi-environment support, cross-browser testing, and robust CI/CD integration.

## 🚀 Features

- **Multi-Environment Support**: Dev, Staging, and Production configurations
- **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge, and Mobile browsers
- **Page Object Model**: Structured and maintainable test architecture
- **Custom Fixtures**: Reusable test components and utilities
- **Comprehensive Reporting**: HTML reports with screenshots, videos, and traces
- **CI/CD Integration**: GitHub Actions with manual trigger support
- **Parallel Execution**: Configurable parallel test execution
- **Retry Mechanism**: Automatic test retries on failure
- **Logging**: Structured logging with Winston
- **Test Categorization**: Smoke and regression test tagging

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v8.x or higher)
- **Git**

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd automation-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npm run install:browsers
```

### 4. Environment Configuration

Create environment-specific configuration files:

```bash
# Development environment
.env.dev

# Staging environment
.env.staging

# Production environment
.env.prod
```

Each environment file should contain:

```env
BASE_URL=https://your-app-url.com
VIEWPORT_WIDTH=1920
VIEWPORT_HEIGHT=1080
HEADLESS=true
PARALLEL=false
WORKERS=1
TIMEOUT=30000
RETRIES=2
BROWSER=chrome
```

## 📁 Project Structure

```
automation-assignment/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD configuration
├── tests/
│   ├── e2e/                        # End-to-end test specifications
│   │   ├── add-products-to-cart.spec.ts
│   │   └── product-search.spec.ts
│   ├── fixtures/                   # Test fixtures and custom test setup
│   │   └── base-test.ts
│   ├── pages/                      # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── CartPage.ts
│   │   ├── HomePage.ts
│   │   ├── ProductDetailsPage.ts
│   │   └── ProductsPage.ts
│   └── utils/                      # Utility functions and helpers
│       ├── helper.ts
│       └── logger.ts
├── test-results/                   # Test execution results and artifacts
├── playwright-report/              # HTML test reports
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation
```

### Key Components

- **Page Objects**: Encapsulate page-specific functionality and selectors
- **Fixtures**: Provide reusable test setup and teardown logic
- **Utilities**: Common helper functions and logging capabilities
- **E2E Tests**: Business logic test scenarios

## 🏃‍♂️ Running Tests

### Basic Test Execution

```bash
# Run all tests (default environment: dev)
npm test

# Run tests in headed mode (browser visible)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Environment-Specific Testing

```bash
# Development environment
npm run test:dev
npm run test:headed:dev
npm run test:debug:dev

# Staging environment
npm run test:staging
npm run test:headed:staging
npm run test:debug:staging

# Production environment
npm run test:prod
npm run test:headed:prod
npm run test:debug:prod
```

### Browser-Specific Testing

```bash
# Run tests on specific browsers
npm run test:chrome
npm run test:firefox
npm run test:safari
npm run test:mobile

# Run tests on all browsers
npm run test:all
npm run test:all:dev
npm run test:all:staging
npm run test:all:prod
```

### Test Categories

```bash
# Run smoke tests
npm run test:smoke
npm run test:smoke:dev
npm run test:smoke:staging
npm run test:smoke:prod

# Run regression tests
npm run test:regression
npm run test:regression:dev
npm run test:regression:staging
npm run test:regression:prod
```

### Advanced Test Execution

```bash
# Run tests with parallel execution
npm run test:parallel

# Run tests with retry mechanism
npm run test:retry

```

### Test Reports

```bash
# View HTML test report
npm run test:report

# View environment-specific reports
npm run test:report:dev
npm run test:report:staging
npm run test:report:prod

# View test traces
npm run trace
```

## 🔧 Configuration

### Playwright Configuration

The `playwright.config.ts` file contains:

- **Test Directory**: `./tests`
- **Test Pattern**: `**/*.spec.ts`
- **Browsers**: Configurable via environment variables
- **Reporters**: HTML reporter with screenshots and videos
- **Retry Logic**: Environment-based retry configuration
- **Parallel Execution**: Configurable worker processes

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TEST_ENV` | Target environment (dev/staging/prod) | `dev` |
| `BASE_URL` | Application base URL | - |
| `BROWSER` | Target browser | `chrome` |
| `HEADLESS` | Run in headless mode | `true` |
| `PARALLEL` | Enable parallel execution | `false` |
| `WORKERS` | Number of worker processes | `1` |
| `TIMEOUT` | Test timeout in milliseconds | `30000` |
| `RETRIES` | Number of retry attempts | `2` |
| `VIEWPORT_WIDTH` | Browser viewport width | `1920` |
| `VIEWPORT_HEIGHT` | Browser viewport height | `1080` |

## 🚀 GitHub Actions CI/CD

### Workflow Configuration

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- **Triggers**: Automatically on push/PR to main/master branches
- **Manual Trigger**: Supports workflow_dispatch with environment selection
- **Node.js Setup**: Uses Node.js 18.x with npm caching
- **Browser Installation**: Installs Playwright browsers with dependencies
- **Test Execution**: Runs tests with configurable environment
- **Artifact Upload**: Saves HTML reports and traces on failure
- **Concurrency Control**: Prevents duplicate workflow runs

### Manual Trigger Instructions

#### Via GitHub UI:
1. Navigate to your repository on GitHub
2. Click on the **"Actions"** tab
3. Select **"Playwright Tests"** workflow
4. Click **"Run workflow"** button
5. Select the target environment (dev/staging/prod)
6. Click **"Run workflow"** to execute

#### Via GitHub CLI:
```bash
# Trigger workflow with default environment (dev)
gh workflow run "Playwright Tests"

# Trigger workflow with specific environment
gh workflow run "Playwright Tests" -f environment=staging
gh workflow run "Playwright Tests" -f environment=prod
```

### Workflow Features

- **Environment Matrix**: Supports multiple Node.js versions and browsers
- **Artifact Management**: Automatically uploads test reports and traces
- **Failure Handling**: Captures screenshots, videos, and traces on test failures
- **Retention Policy**: Maintains artifacts for 30 days
- **Concurrency Control**: Cancels previous runs when new commits are pushed

## 📊 Test Reports and Artifacts

### HTML Reports
- **Location**: `playwright-report/index.html`
- **Features**: Interactive test results, screenshots, videos, traces
- **Access**: Open locally or download from GitHub Actions artifacts

### Test Results
- **Location**: `test-results/`
- **Contents**: Screenshots, videos, traces, and test metadata
- **Retention**: Available for debugging and analysis

### Logging
- **Framework**: Winston logger
- **Levels**: Info, warn, error, debug
- **Output**: Console and file-based logging


## 🔍 Debugging

### Debug Mode
```bash
# Run tests in debug mode
npm run test:debug

# Debug specific environment
npm run test:debug:dev
```

### Trace Viewer
```bash
# View traces from failed tests
npm run trace
```

### Code Standards
- Follow TypeScript best practices
- Maintain Page Object Model structure
- Include appropriate test tags (@smoke, @regression)
- Add logging for test steps
- Write descriptive test names and comments
