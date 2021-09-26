---
title: 'Displaying OpenGraph Metadata for a React App Without Serverside Rendering'
date: '2021-09-02'
imageURL: '/img/card_catalog.png'
quote: "To a collector of curios, the dust is metadata."
quoteAuthor: 'David Weinberger'
---

So you've made a nice React app with [React Router](https://www.npmjs.com/package/react-router) and an Express backend, and you've set up the server so it redirects all requests to `index.html`. The index page just has a few lines that tell the browser to load your actual app as a JavaScript bundle. From there, React Router looks at the specific path and decides which part of your app to display. Maybe you're even using [React Helmet](https://www.npmjs.com/package/react-helmet) to change the page title in the browser each time the user opens a new part of your app.

Your index page probably looks something like this:

```html
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>My Website</title>
  <meta property="og:title" content="My website" />
  <meta property="og:description" content="My website is the coolest place on the internet." />
  <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
  <link rel="stylesheet" href="/main.css">
</head>

<body>
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>

</html>
```

But there's a problem. This file is totally generic, always the same regardless of whether the user navigates to your homepage or something deep within your site. So when a service like Facebook loads a link preview, the meta tags such as `title` and `description` will always be the same. Even if you use React Helmet to fill them out in the client, search engines and social media sites don't download your JavaScript bundle - they just go with what the original meta tags say.

The main way to avoid this issue is by using **server-side rendering**, where the server renders the page into plain HTML and sends that to the browser. Server-side rendering is cool (and it's probably the future of web apps), but there's no need to make such a huge change to your existing codebase.

The trick we're going to use could technically be considered a form of server-side rendering, but it's not the full-scale SSR that developers are talking about when they use the term. We're going to peek into `index.html` and **change the metadata properties depending on the path of the request**.

To start, let's set up a simple template system for metadata. Anything in `{brackets}` will be changed before sending `index.html` to the client. There's no specific reason to use brackets here, you can use whatever symbol you want as long as it doesn't interfere with typical HTML formatting.

```html
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title}</title>
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
  <link rel="stylesheet" href="/main.css">
</head>
```

So how will we replace them on every request?

Your server is probably sending `index.html` directly from the disk. We're going to change that.

First, let's load `index.html` into a **string** that sits in memory:

```ts
// path to wherever you keep index.html
const staticFolder = path.join(__dirname, '..', 'frontend')
// read index.html to a string so we can replace parts of it later
const indexPage = fs.readFileSync(`${staticFolder}/index.html`, 'utf8')
```

Now we're going to tinker with the `indexPage` string each time it's requested. In your server's default path handler, add the following:

```ts
// We'll write the getMetadata function next
app.get('/*', async (req, res) => {
  // req.path provides the path of the request, which is everything after the domain.
  // For example, this tutorial's path is /blog/opengraph_without_ssr
  const formattedIndex = await getMetadata(req.path, indexPage)
  return res.send(formattedIndex)
})
```

Since I'm using TypeScript, I'm going to create an interface to keep track of the metadata I need. If you're not using TypeScript, make sure to remember which properties you put into brackets in `index.html`!

```ts
interface Metadata {
  title: string,
  description: string
}
```

Now let's write a function called `getMetadata`, which will handle all metadata-related operations and then return the properly-populated `indexPage`.

This is an abridged version of what I use in Chromapoll, one of my personal projects.

```ts
const getMetadata = (path: string, indexPage: string): string => {
  /*/
  Chromapoll has few enough paths that a simple if-else block is enough.
  If your site has more paths, you should consider something more systematic,
  such as a slug: https://developer.mozilla.org/en-US/docs/Glossary/Slug
  /*/
  if (path === '/create' || path === '/create/') {
    // We will implement the insertMetadata function next!
    return insertMetadata(indexPage, {
      title: 'Chromapoll - Create a Poll',
      description: 'Create a new poll with Chromapoll.'
    })
  } else if (path === '/latest' || path === '/latest/') {
    return insertMetadata(indexPage, {
      title: 'Chromapoll - Latest Polls',
      description: 'The latest polls from Chromapoll.'
    })
  } else {
    return insertMetadata(indexPage, {
      title: 'Chromapoll',
      description: 'Make polls with color.'
    })
  }
}
```

Now we have the important parts down. Ideally, `getMetadata` should be placed as a default export in its own module, such as `metadata.ts` in your server's root directory, with any associated functions residing there as private, non-exported functions.

For actually replacing the `{bracket}` placeholders from our index template, we can just use the [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method. There's a small hitch, though: just calling `whatever.replace(x, y)` will only replace the **first** instance of `x`.

Your index template probably uses multiple copies of the same metadata for different sites, such as:

```html
<head>
  <title>{title}</title>
  <meta property="og:title" content="{title}" />
  <meta name="twitter:title" content="{title}">
</head>
```

We need to replace all of them. So we'll use the [**global regex modifier**](https://stackoverflow.com/questions/12993629/what-is-the-meaning-of-the-g-flag-in-regular-expressions).

Instead of this:

```ts
// Only replaces the first instance of {title}
indexPage.replace("{title}", metadata.title)
```

We need to do this:

```ts
// Replaces all instances of {title}
indexPage.replace(/{title}/g, metadata.title)
```

We can chain replace calls together as many times as we want. It's important to note that the replace method **does not modify the original string**, it just returns a new one. As a result, we can rely on `indexPage` being a constant that is never modified.

So our final `insertMetadata` function looks like:

```ts
const insertMetadata = (indexPage: string, metadata: Metadata): string => {
  return indexPage
    .replace(/{title}/g, metadata.title)
    .replace(/{description}/g, metadata.description)
}
```

That's it! If you check out your site in an OpenGraph previewer, you should see the proper title and description for whatever page you linked.

## Closing thoughts and where to go next

You'll probably need more metadata than just title and description, such as `image`, `url`, `locale`, `site_name`, and [many more](https://ogp.me/). This approach is nice because you have the foundation to add whatever custom content you want.

For example, Chromapoll users can create polls, which are available at the `/polls/id` path. To properly show their information in the metadata, I needed to add a call to the database to fetch the title and other information. So I created an asynchronous `fetchPollInfo` function that `getMetadata` calls when it's provided with a path that begins with `/poll/`. All of this logic sits in the `metadata.ts` module, safely separated from the rest of the codebase.

OpenGraph previews look a lot nicer with images. Flavio Copes has [a useful tutorial on creating custom images at runtime with Canvas](https://flaviocopes.com/canvas-node-generate-image/)*. Using information from that page alongside the [MDN Canvas API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), I wrote a function that generates an image with custom text and coloring for poll pages, and I call it each time there's a request to a poll page. If your site is more static, you can just keep a few images in a folder and serve different ones depending on the path.

You can check out my complete implementation for Chromapoll [here](https://github.com/mythmakerseven/chromapoll/blob/main/server/metadata.ts).

*Copes's tutorial has one questionable decision. When writing the preview image to disk, he uses the `fs.writeFileSync` method. Using this method instead of `fs.writeFile`makes the code simpler and prevents you from having to deal with callbacks or promises, but drawback is that it **stops the main thread** (i.e. freezes your program) until the file operation is complete. I used `fs.readFileSync` early in this article to load `index.html` into memory, which isn't a big deal because it only runs once on startup. But it makes no sense to use the sync method for writing the previews to disk, because this function will halt the main thread - interfering with all other requests - every single time it's called. In my personal implementation, I used `util.promisify()` on the regular `fs.writeFile` function, which allows me to use it with regular `async/await` syntax without blocking the main thread.