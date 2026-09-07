AGENTS
======

Rule: NEVER COMMIT ANYTHING
--------------------------

Agents, bots, or automated processes MUST NOT create commits, push changes, or add files to the repository without explicit, prior human approval.

Why
- Prevent accidental leakage of secrets, credentials, or sensitive data.
- Avoid automated changes that bypass code review and CI policies.

Allowed actions
- Create suggested patches, diffs, or local files and present them to a human for review.
- Propose exact git commands or PR descriptions for a human to run.

Required practices
- Use environment variables and secret managers (e.g., Vercel/GitHub secrets) for credentials.
- Add sensitive files (e.g., .env.local) to .gitignore and remove secrets from the repo if present.
- Ask for explicit approval before any commit or push.

If secrets were accidentally committed
- Rotate the secrets immediately.
- Remove them from history using an appropriate tool (BFG, git filter-repo) and coordinate with the team.

Questions
- Contact the repo owners or maintainers before performing any repository write operations.