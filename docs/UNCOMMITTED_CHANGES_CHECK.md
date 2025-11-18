# Uncommitted Changes Detection

This project includes an automatic check for uncommitted git changes that runs before building. This ensures all code changes are properly versioned before deployment.

## How It Works

The script `scripts/check-uncommitted-changes.js` is automatically run as a **prebuild** hook before `npm run build`. It checks the git working tree status and:

- ✅ **Allows build to proceed** if the working tree is clean (no uncommitted changes)
- ❌ **Stops the build** if there are uncommitted changes
- ⚠️ **Skips the check** in CI/CD environments (GitHub Actions, Vercel, etc.)
- ⚠️ **Skips the check** if not in a git repository

## Usage

### Normal Development

When working locally with uncommitted changes:

```bash
npm run build
```

This will fail with a message like:

```
❌ Uncommitted changes detected:

 M package.json
?? new-file.txt

Please commit or stash your changes before proceeding.
```

### Committing Changes

To fix this, commit your changes:

```bash
git add .
git commit -m "Your commit message"
npm run build  # Now it will work
```

### Bypassing the Check

If you need to bypass the check temporarily:

**Option 1: Use environment variable**
```bash
SKIP_UNCOMMITTED_CHECK=true npm run build
```

**Option 2: Run Next.js directly**
```bash
npx next build
```

**Option 3: Run just the build script**
```bash
npm run build --ignore-scripts
```

### Running the Check Manually

You can run the check independently:

```bash
npm run check-uncommitted
```

## CI/CD Behavior

The check is automatically skipped in these environments:

- **GitHub Actions** (when `GITHUB_ACTIONS=true`)
- **Vercel** (when `VERCEL=1`)
- **Generic CI** (when `CI=true`)
- **Manual override** (when `SKIP_UNCOMMITTED_CHECK=true`)

This ensures that deployments work correctly in CI/CD pipelines where the git state may not be pristine.

## Why This Check?

This check helps teams:

1. **Prevent accidental deployments** of uncommitted code
2. **Maintain clean git history** by encouraging commits before builds
3. **Ensure reproducibility** by having all changes in version control
4. **Catch forgotten changes** before they cause issues in production

## Customization

To modify the behavior, edit `scripts/check-uncommitted-changes.js`:

- Add more CI environment variables to skip the check
- Change the exit behavior (warning vs error)
- Customize the output messages
- Add ignore patterns for specific files

## Example Scenarios

### Scenario 1: Local Development with Changes
```bash
$ echo "test" > test.txt
$ npm run build

❌ Uncommitted changes detected:
?? test.txt
Please commit or stash your changes before proceeding.
```

### Scenario 2: Clean Working Tree
```bash
$ git add test.txt
$ git commit -m "Add test file"
$ npm run build

✅ No uncommitted changes detected. Proceeding...
[Build continues normally...]
```

### Scenario 3: CI/CD Environment
```bash
$ CI=true npm run build

✅ CI/CD environment detected. Uncommitted changes check skipped.
[Build continues normally...]
```

## Troubleshooting

### "Not a git repository" Warning

If you see this warning, the check is automatically skipped. This happens when:
- The project is not in a git repository
- Git is not installed
- The `.git` directory was removed

### Build Fails with Uncommitted Changes

This is the intended behavior! To fix:
1. Review your changes: `git status`
2. Commit them: `git add . && git commit -m "message"`
3. Or stash them: `git stash`
4. Then build again: `npm run build`

### Check Not Running

If the check isn't running:
1. Ensure `prebuild` script exists in `package.json`
2. Verify `scripts/check-uncommitted-changes.js` exists
3. Check that you're not in a CI environment
4. Run manually: `npm run check-uncommitted`

## Integration with Other Tools

### Pre-commit Hooks

You can also use this with tools like Husky:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run check-uncommitted"
    }
  }
}
```

### Git Hooks

Or add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run check-uncommitted
```

### Continuous Integration

In your CI configuration, the check runs automatically but is skipped:

```yaml
# .github/workflows/deploy.yml
- name: Build
  run: npm run build  # Check is skipped automatically
```
