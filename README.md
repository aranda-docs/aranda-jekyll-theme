# Aranda Docs Jekyll theme

## What is this?

This is a Jekyll theme used to create the documentation portal. It has been developed to be a customizable minimalistic theme.

---

## Instructions

You can start to use this theme using one of three methods:

- cloning/forking a starter website that already use this theme,
- using the theme as a remote theme using the Github repository
- or forking/copying the theme source code into your project.

### Remote theme installation

Jekyll can use *remote themes* existing in an external repository. You do not need to download code or install any special Gem package. It can be easily used for sites hosted with GitHub Pages.

To install:

1. Create/replace the contents of your `Gemfile` with the following:

   ```ruby
   source "https://rubygems.org"

   gem "github-pages", group: :jekyll_plugins
   ```

2. Add `jekyll-include-cache` to the `plugins` array of your `_config.yml`.

3. Fetch and update bundled gems by running the following [Bundler](http://bundler.io/) command:

   ```bash
   bundle
   ```

4. Add `remote_theme: "aranda-docs/aranda-jekyll-theme"` to your `_config.yml` file. Remove any other `theme:` or `remote_theme:` entry.

---

## Local installation for development

You can install Jekyll in your computer to preview the changes in your compuyter before submitting a pull request to Github.

The following are instructions for Ubuntu Linux (or Ubuntu/WSL on Windows 10)

### Install Jekyll

1. Install Jekyll pre-requisites, including the Ruby language

   ```
   sudo apt-get install ruby-full build-essential zlib1g-dev
   ```

2. Configure the Ruby language to install software in the `$HOME` directory

   ```
   echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
   echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
   echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. Install Jekyll

   ```
   gem install jekyll bundler
   ```

### Clone and modify the repository

1. Download the website

   ```
   git clone https://github.com/aranda-docs/aranda-jekyll-theme
   ```

2. Run the Jekyll preview to preview and regenerate the website when the files are changed

   ```
   cd aranda-jekyll-theme
   bundle exec jekyll serve
   ```

5. Preview the included test site (in the `test/` directory) using a web browser. While this command is running, each time you modify  the theme or the included websites (in the `test/` and `docs/`directories), it will regenerate the sites and you may see the changes in the browser after a refresh.

   ```
   http://localhost:4000/test/
   ```
