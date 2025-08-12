# Email Templates

This directory contains email templates organized in a clean structure:

## Folder Structure

- `mjml/` - Contains the source MJML files
- `html/` - Contains the generated HTML files (auto-generated)

## Available Scripts

- `yarn email:dev <name>` - Watch for changes in a specific template and auto-open HTML file
- `yarn email:build <name>` - Build a specific template

## Usage Examples

```bash
# Watch specific template (auto-opens HTML file and refreshes on changes)
# You can use template name with or without .mjml extension
yarn email:dev newsletter
yarn email:dev template_2.mjml  # Also works!

# Build specific template
yarn email:build newsletter
yarn email:build template_2.mjml  # Also works!
```

## Adding New Templates

1. Create your MJML file in the `mjml/` folder (e.g., `mjml/newsletter.mjml`)
2. Use `yarn email:dev newsletter` to watch just that template (auto-opens HTML)

## Performance Tips

- **For development**: Use `yarn email:dev <name>` to watch only the template you're working on automatically opens the HTML file and refreshes it on changes
