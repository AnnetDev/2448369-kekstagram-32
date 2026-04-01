# Kekstagram

A photo-sharing web application where users can browse photos uploaded by others, apply filters and effects to their own photos, and publish them with hashtags and a caption.

## Features

- **Photo gallery** — browse a grid of user-uploaded photos with like and comment counts
- **Gallery filters** — sort photos by Default, Random, or Most Discussed
- **Fullscreen view** — click any photo to open it in a fullscreen overlay with comments and likes
- **Load more comments** — paginated comment loading in the fullscreen view
- **Photo upload** — select a local image (JPG / PNG) to open the editing modal
- **Scale controls** — zoom the preview in or out (25%–100%) before publishing
- **Effects** — apply one of six visual filters to the image: Original, Chrome, Sepia, Marvin, Phobos, Heat
- **Effect depth slider** — fine-tune filter intensity via a noUiSlider range input
- **Hashtag validation** — real-time client-side validation with descriptive error messages
- **Caption** — add a text description (up to 140 characters) with live character-count validation
- **Publish / error feedback** — success and error modals after form submission
- **Responsive layout** — adapted for desktop, tablet, and mobile screens

## Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (custom, no framework) |
| Logic | Vanilla JavaScript (ES2022, modules) |
| Bundler | Vite 4 |
| Linter | ESLint (htmlacademy config) |
| Slider | noUiSlider |
| Validation | Pristine.js |
| Deploy | GitHub Pages (`gh-pages`) |

## Validation rules

**Hashtags** (field is optional):
- Each hashtag must start with `#`
- Only letters and digits after `#`, max 20 characters total
- No more than 5 hashtags, separated by spaces
- Duplicates are not allowed (case-insensitive)

**Caption**:
- Maximum 140 characters

Validation runs on every keystroke. The Publish button is disabled while the form is invalid.

## Getting started

```bash
npm install      # install dependencies
npm start        # dev server at localhost:3000
npm run build    # production build → dist/
npm run deploy   # build + publish to GitHub Pages
npm run lint     # ESLint check
```

---

<a href="https://htmlacademy.ru/intensive/javascript"><img align="left" width="50" height="50" alt="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/javascript/logo-for-github-2.png"></a>

This repository was created as part of the intensive online course «[JavaScript. Professional Web Development](https://htmlacademy.ru/intensive/javascript)» by [HTML Academy](https://htmlacademy.ru).

---

* Student: [Anna Baidikova](https://www.linkedin.com/in/anna-baidikova/).
* Mentor: [Oleg Gluschenko](https://htmlacademy.ru/profile/id305355).
